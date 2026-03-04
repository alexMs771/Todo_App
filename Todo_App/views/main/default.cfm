<!DOCTYPE html>
<html>
<head>
    <title>Todo App</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="assets/main.js"></script>
</head>

<body class="container mt-5">

<div class="text-center text-danger display-3 mb-4">todos</div>

<div class="card w-75 mx-auto">
    <div class="card-body">
        <input type="text" id="paraText" class="form-control form-control-lg" placeholder="What needs to be done?">
    </div>

    <ul class="list-group list-group-flush" id="todoList">
        <cfoutput query="rc.todos">
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <input type="checkbox" class="item me-2" data-id="#id#" <cfif isDone>checked</cfif>>
                    <span class="<cfif isDone>text-decoration-line-through text-muted</cfif>">
                        #todo_text#
                    </span>
                </div>
                <button class="deleteBtn btn btn-sm" data-id="#id#">✕</button>
            </li>
        </cfoutput>
    </ul>

    <div class="card-footer d-flex justify-content-between">
        <span id="itemsLeft"></span>
        <div>
            <button class="btn btn-sm btn-outline-danger" id="allBtn">All</button>
            <button class="btn btn-sm btn-outline-danger" id="activeBtn">Active</button>
            <button class="btn btn-sm btn-outline-danger" id="completedBtn">Completed</button>
            <button class="btn btn-sm btn-outline-danger" id="clearCompletedBtn">Clear Completed</button>
        </div>
    </div>
</div>

<div id="msg" class="text-center mt-3 text-danger"></div>

</body>
</html>