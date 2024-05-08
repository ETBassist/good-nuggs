import { Handle, Position } from 'reactflow';

export const ResponseNode = ({data}) => {
    return (
        <div >
            <div style={{ padding: '10px 20px', border: '1px solid black', backgroundColor: 'white' }}>
                <p style={{color: 'black'}}>{data.label}</p>
            </div>

            <Handle type="target" position={Position.Top} />
        </div>
    );
};
