import { Handle, Position } from 'reactflow';




export const OpponentNode = ({ data }) => {
    return (
        <>
            <div style={{ padding: '10px 20px', border: '1px solid black', backgroundColor: 'white' }}>
                <p style={{color: 'black'}}>{data.label}</p>
            </div>

            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} id={`right`} />
            <Handle type="source" position={Position.Bottom} id={`bottom`} />
        </>
    );
};
