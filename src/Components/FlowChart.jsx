import {useCallback, useEffect, useMemo} from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge, BackgroundVariant
} from 'reactflow';

import 'reactflow/dist/style.css';
import {OpponentNode} from "./OpponentNode.jsx";
import {ResponseNode} from "./ResponseNode.jsx";

const styles = {
    background: '#F0F8FF',
    width: '100%',
    height: 300,
};

export default function FlowChart() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const nodeTypes = useMemo(() => ({ OpponentNode: OpponentNode, ResponseNode: ResponseNode }), []);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const getVertices = () => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        fetch("http://localhost:3030/vertices", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setNodes(result)
            })
            .catch((error) => console.log("error", error));
    };
    const getEdges = () => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        fetch("http://localhost:3030/edges", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setEdges(result)
            })
            .catch((error) => console.log("error", error));
    };
    const updateNode = (args) => {
        let params = args[0]
        if(params.position) {
            let { x, y } = params.position
            var requestOptions = {
                method: "PATCH",
                body: JSON.stringify({position: {x: x, y: y}}),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            };
            updateNodeRequest(params.id, requestOptions)
        }
        onNodesChange(args)
    }
    const onNodeClick = (event, object) => {
        var requestOptions = {
            method: "PATCH",
            body: JSON.stringify({hidden: false}),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        };

        object.revealNodeIds.forEach((id) => {
            updateNodeRequest(id, requestOptions)
        })
    }
    const resetData = async () => {
        let nodesToHide = [3,4,5,9,10,11,12,13,14,15]

        var requestOptions = {
            method: "PATCH",
            body: JSON.stringify({hidden: true}),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        };

        let requests = nodesToHide.map((id) => {
            return updateNodeRequest(id, requestOptions)
        })

        await Promise.all(requests)
    }

    const updateNodeRequest = async (id, requestOptions) => {
        fetch('http://localhost:3030/vertices/' + id, requestOptions).then(() => getVertices())
    }

    useEffect(() => {
        getVertices();
        getEdges();
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <button onClick={() => resetData()}>Reset Data</button>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={updateNode}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                style={styles}
                onNodeClick={onNodeClick}
                // fitView
            >

                <Controls />
                <MiniMap />
                <Background variant={BackgroundVariant.Cross}/>
            </ReactFlow>
        </div>
    );
}
