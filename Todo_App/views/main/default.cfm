<!DOCTYPE html>
<html>
<head>
    <title>Todo_App</title>
    <style>
        .container{
            background: #f5f5f5;
        }
        .head{
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-size: 5rem;
        }
        .newone{
            border: none;
            outline: none;
            width: 100%;
            background: transparent;
        }
        .newone::placeholder{
            color: #999;
            font-style: italic;
        }
        .bigContainer:focus-within{
            border: 1px ridge rgb(170, 93, 93);
        }
        .item:checked + p{
            text-decoration: line-through;
            color: #999;
        }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="assets/main.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
</head>
<cfoutput>
    <cfset todosList = rc.todosList>
</cfoutput>
<body class="mb-2 container">
    <div class="container">
        <div class="text-center text-danger head">todos</div><br>
            <div class="shadow text-center w-75 mx-auto bg-white bigContainer">
                <div class="d-flex align-items-flex-start gap-2 p-3 w-100 text-decoration-none font-italic form-control-lg" autofocus>
                    <button class="btn" type="button" id="checkAll"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="34px" fill="black"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg></button>
                    <input type="text" name="paraText" id="paraText" class="newone" placeholder="What needs to be done?" autofocus><br>
                </div>
            </div>
            <div class="shadow text-center w-75 mx-auto bg-white">
                <cfset isDone = todosList.isDone>
                <ul class="list-group">
                    <cfoutput query="todosList">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center gap-4">
                                <input class="form-check-input rounded-circle item" type="checkbox" name="id" value="#todosList.id#" style="height:2rem;width:1.5rem;"<cfif isDone EQ 1>checked</cfif>>
                                <p class="h4 fw-normal text-muted">#todosList.todo_text#</p>
                            </div>
                            <button class="btn" id="deleteBtn" value="#todosList.id#"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="20px"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>
                        </li>
                    </cfoutput>
                <div class="d-flex justify-content-between align-items-center p-3 gap-2">
                    <span><cfoutput>
                        #todosList.recordCount# items left
                    </cfoutput></span>
                    <button class="btn btn-sm btn-outline-danger checkAll" id="checkAll">All</button>
                    <button class="btn btn-sm btn-outline-danger" id="activeBtn">Active</button>
                    <button class="btn btn-sm btn-outline-danger" id="completedBtn">Completed</button>
                    <button class="btn btn-sm btn-outline-danger" id="clearCompletedBtn">Clear Completed</button>
                </div>
                </ul>
            </div>
        </div><br><br>
        <div id="msg"></div>
    </div>
</body>
</html>