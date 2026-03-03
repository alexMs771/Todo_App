<cfcomponent output="false">
    <cffunction name="saveTodo" access="remote" returntype="any" returnFormat="json">
        <cfargument name="todo_text" required="true">
        <cfquery datasource="CFtasks" name="qAddTodo">
            INSERT INTO todoList (todo_text, isDone)
            VALUES (<cfqueryparam value="#arguments.todo_text#" cfsqltype="cf_sql_varchar">, 0)
        </cfquery>
        <cfreturn { "status": "success" }>
    </cffunction>
    <cffunction name="getTodos" access="remote" returntype="any" returnFormat="json">
        <cfquery datasource="CFtasks" name="qGetTodos">
            SELECT id, todo_text, isDone
            FROM todoList
        </cfquery>
        <cfreturn qGetTodos>
    </cffunction>
    <cffunction name="eachDelete" access="remote" returntype="any" returnFormat="json">
        <cfargument name="id" required="true">
        <cfquery datasource="CFtasks" name="qdelTodos">
            DELETE FROM todoList
            WHERE id = <cfqueryparam value="#arguments.id#" cfsqltype="cf_sql_integer">
        </cfquery>
        <cfreturn { "status": "success" }>
    </cffunction>
    <cffunction name="updateCheck" access="remote" returntype="any" returnFormat="json">
        <cfargument name="id" required="true">
        <cfquery datasource="CFtasks">
            UPDATE todoList
            SET isDone = 1
            WHERE id = <cfqueryparam value="#arguments.id#" cfsqltype="cf_sql_integer">
        </cfquery>
        <cfreturn {"status" : "success"}>
    </cffunction>
    <!---cffunction name="updateAlready" access="remote" returntype="any" returnFormat="json">
        <cfargument name="id" required="true">
        <cfquery datasource="CFtasks">
            UPDATE todoList
            SET isDone = 0
            WHERE id = <cfqueryparam value="#arguments.id#" cfsqltype="cf_sql_integer">
        </cfquery>
        <cfreturn {"status" : "success"}>
    </cffunction--->
</cfcomponent>