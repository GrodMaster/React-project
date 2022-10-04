const NotFound = ({onNotFound})=>{
    return(
        <div>
            <h1>No result </h1>
            <input type='btn' defaultValue='Вернутсья на главную страницу' onClick={()=> onNotFound()}/>
        </div>
    )
}

export default NotFound