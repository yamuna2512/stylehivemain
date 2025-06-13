const Empty = (props) => {
    return (
        <div className={`${props.className ? props.className : ''}`}>
            <p>{props.message ?? 'Empty'}</p>
        </div>    
    );
}

export default Empty;
