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
import {CustomNode} from "./CustomNote.jsx";

const styles = {
    background: '#F0F8FF',
    width: '100%',
    height: 300,
};

export default function FlowChart() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

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

        var requestOptions = {
            method: "PATCH",
            body: JSON.stringify(params),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        };

        if(params.position) {
            fetch('http://localhost:3030/vertices/' + params.id, requestOptions)
        }
        onNodesChange(args)
    }

    useEffect(() => {
        getVertices();
        getEdges();
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={updateNode}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                style={styles}
                // fitView
            >

                <Controls />
                <MiniMap />
                <Background variant={BackgroundVariant.Cross}/>
            </ReactFlow>
        </div>
    );
}