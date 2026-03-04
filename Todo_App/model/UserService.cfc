component output="false" {

    function getTodos() {
        return queryExecute(
            "SELECT id, todo_text, isDone FROM todoList ORDER BY id DESC",
            [],
            { datasource="CFtasks" }
        );
    }

    function saveTodo(todo_text) {
        queryExecute(
            "INSERT INTO todoList (todo_text, isDone) VALUES (?,0)",
            [ todo_text ],
            { datasource="CFtasks" }
        );
        return { status="success" };
    }

    function deleteTodo(id) {
        queryExecute(
            "DELETE FROM todoList WHERE id=?",
            [ id ],
            { datasource="CFtasks" }
        );
        return { status="success" };
    }

    function toggleTodo(id, isDone) {
        queryExecute(
            "UPDATE todoList SET isDone=? WHERE id=?",
            [ isDone, id ],
            { datasource="CFtasks" }
        );
        return { status="success" };
    }

    function getFiltered(type) {
        var sql = "SELECT id, todo_text, isDone FROM todoList";
        if (type == "active") sql &= " WHERE isDone=0";
        if (type == "completed") sql &= " WHERE isDone=1";
        sql &= " ORDER BY id DESC";

        return queryExecute(sql, [], { datasource="CFtasks" });
    }

    function clearCompleted() {
        queryExecute(
            "DELETE FROM todoList WHERE isDone=1",
            [],
            { datasource="CFtasks" }
        );
        return { status="success" };
    }
}