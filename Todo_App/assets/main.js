$(document).ready(function () {

    loadTodos("all");


    $("#paraText").on("keydown", function (e) {

        if (e.key === "Enter") {

            e.preventDefault();

            var txt = $("#paraText").val().trim();
            if (txt === "") return;

            $.ajax({
                url: "index.cfm?action=main.save",
                type: "POST",
                dataType: "json",
                data: { todo_text: txt },

                success: function (res) {

                    $("#paraText").val("");
                    loadTodos("all");

                }
            });

        }

    });



    $(document).on("click", ".deleteBtn", function () {

        var id = $(this).data("id");

        $.ajax({
            url: "index.cfm?action=main.delete",
            type: "POST",
            dataType: "json",
            data: { id: id },

            success: function () {

                loadTodos("all");

            }
        });

    });



    $(document).on("change", ".item", function () {

        var id = $(this).data("id");
        var done = $(this).is(":checked") ? 1 : 0;

        $.ajax({
            url: "index.cfm?action=main.toggle",
            type: "POST",
            dataType: "json",
            data: { id: id, isDone: done },

            success: function () {

                loadTodos("all");

            }
        });

    });



    $("#allBtn").click(function () {

        loadTodos("all");

    });

    $("#activeBtn").click(function () {

        loadTodos("active");

    });

    $("#completedBtn").click(function () {

        loadTodos("completed");

    });



    $("#clearCompletedBtn").click(function () {

        $.ajax({
            url: "index.cfm?action=main.clearCompleted",
            type: "POST",
            dataType: "json",

            success: function () {

                loadTodos("all");

            }
        });

    });




    function loadTodos(type) {

        $.ajax({
            url: "index.cfm?action=main.filter",
            type: "GET",
            dataType: "json",
            data: { type: type },

            success: function (data) {

                renderTodos(data);

            }
        });

    }




    function renderTodos(data) {

        var html = "";
        var left = 0;

        if (data.DATA) {

            $.each(data.DATA, function (i, row) {

                var id = row[0];
                var text = row[1];
                var done = row[2];

                if (done == 0) left++;

                html += `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <input type="checkbox" class="item me-2" data-id="${id}" ${done == 1 ? "checked" : ""}>
                        <span class="${done == 1 ? "text-decoration-line-through text-muted" : ""}">
                            ${text}
                        </span>
                    </div>
                    <button class="deleteBtn btn btn-sm" data-id="${id}">✕</button>
                </li>`;

            });

        }

        $("#todoList").html(html);

        $("#itemsLeft").text(left + " items left");

    }

});