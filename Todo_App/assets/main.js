$(document).ready(function(){

function renderTodos(data){

    var html = "";

    for(var i=0;i<data.DATA.length;i++){

        var id = data.DATA[i][0];
        var text = data.DATA[i][1];
        var done = data.DATA[i][2];

        var checked = done == 1 ? "checked" : "";
        var line = done == 1 ? "text-decoration-line-through text-muted" : "";

        html += `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <input type="checkbox" class="item me-2" data-id="${id}" ${checked}>
                <span class="${line}">
                    ${text}
                </span>
            </div>
            <button class="deleteBtn btn btn-sm" data-id="${id}">✕</button>
        </li>
        `;
    }

    $("#todoList").html(html);

}


function loadTodos(type){

    $.ajax({

        url:"index.cfm?action=main.filter",
        type:"get",
        dataType:"json",
        data:{type:type},

        success:function(res){

            renderTodos(res);

        }

    });

}



$("#paraText").keypress(function(e){

    if(e.which == 13){

        var txt = $("#paraText").val().trim();

        if(txt == "") return;

        $.ajax({

            url:"index.cfm?action=main.save",
            type:"post",
            dataType:"json",
            data:{todo_text:txt},

            success:function(){

                $("#paraText").val("");

                loadTodos("all");

            }

        });

    }

});



$("#allBtn").click(function(){

    loadTodos("all");

});


$("#activeBtn").click(function(){

    loadTodos("active");

});


$("#completedBtn").click(function(){

    loadTodos("completed");

});



$(document).on("click",".deleteBtn",function(){

    var id = $(this).data("id");

    $.ajax({

        url:"index.cfm?action=main.delete",
        type:"post",
        dataType:"json",
        data:{id:id},

        success:function(){

            loadTodos("all");

        }

    });

});



$(document).on("change",".item",function(){

    var id = $(this).data("id");

    var done = $(this).is(":checked") ? 1 : 0;

    $.ajax({

        url:"index.cfm?action=main.toggle",
        type:"post",
        dataType:"json",
        data:{
            id:id,
            isDone:done
        },

        success:function(){

            loadTodos("all");

        }

    });

});



$("#clearCompletedBtn").click(function(){

    $.ajax({

        url:"index.cfm?action=main.clear",
        type:"post",
        dataType:"json",

        success:function(){

            loadTodos("all");

        }

    });

});

});