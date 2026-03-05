component {

    property name="todoService";

    function default(rc){

        rc.todos = todoService.getTodos();

    }

    function save(rc){

        var res = todoService.saveTodo(rc.todo_text);

        return serializeJSON(res);

    }

    function delete(rc){

        var res = todoService.deleteTodo(rc.id);

        return serializeJSON(res);

    }

    function toggle(rc){

        var res = todoService.toggleTodo(rc.id,rc.isDone);

        return serializeJSON(res);

    }

    function filter(rc){

        var q = todoService.getFiltered(rc.type);

        return serializeJSON(q);

    }

    function clear(rc){

        var res = todoService.clearCompleted();

        return serializeJSON(res);

    }

}