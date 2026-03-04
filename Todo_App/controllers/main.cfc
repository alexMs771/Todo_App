component accessors="true" output="false" {

    property name="UserService" inject="model.UserService";

    function default(rc) {
        rc.todos = UserService.getTodos();
    }

    function save(rc) {
        var result = UserService.saveTodo(rc.todo_text);
        variables.fw.renderData("json", result);
    }

    function delete(rc) {
        var result = UserService.deleteTodo(rc.id);
        variables.fw.renderData("json", result);
    }

    function toggle(rc) {
        var result = UserService.toggleTodo(rc.id, rc.isDone);
        variables.fw.renderData("json", result);
    }

    function filter(rc) {
        var result = UserService.getFiltered(rc.type);
        variables.fw.renderData("json", result);
    }

    function clearCompleted(rc) {
        var result = UserService.clearCompleted();
        variables.fw.renderData("json", result);
    }
}