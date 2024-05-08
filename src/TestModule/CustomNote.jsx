import { Handle, Position } from 'reactflow';

export const CustomNode = ({ data }) => {
    return (
        <>
            <div style={{ padding: '10px 20px' }}>
                {data.label}
                <button>yes</button>
                <button>no</button>
            </div>

            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
        </>
    );
};