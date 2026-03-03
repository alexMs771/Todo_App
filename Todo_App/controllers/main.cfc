component accessors="true" output="false"{
    property name="UserService" inject="model.UserService";
    remote function init(fw) {
        variables.fw = fw;
        return this;
    }
    remote void function default(struct rc) {
        rc.todosList = variables.UserService.getTodos();
    }
    remote void function save(struct rc) {
        var successStruct = variables.UserService.saveTodo(rc.todo_text);
        variables.fw.renderData("json", successStruct);
    }
    remote void function delete(struct rc) {
        var successStruct = variables.UserService.eachDelete(rc.id);
        variables.fw.renderData("json", successStruct);
    }
    remote void function updateCheckboxes(struct rc){
        var successStruct = variables.UserService.updateCheck(rc.id);
        variables.fw.renderdata("json", successStruct);
    }
   /* remote void function updatealreadychecked(struct rc){
        var successStruct = variables.UserService.updateAlready(rc.id);
        variables.fw.renderdata("json", successStruct);
    }*/
}