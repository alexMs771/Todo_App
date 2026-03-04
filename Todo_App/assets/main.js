$(document).ready(function () {

    loadTodos("all");

    $("#paraText").on("keydown", function (e) {
        if (e.key === "Enter" || e.keyCode === 13) {
            e.preventDefault();

            var txt = $("#paraText").val().trim();
            if (txt === "") return;

            $.ajax({
                url: "index.cfm?action=main.save",
                type: "POST",
                dataType: "json",
                data: { todo_text: txt },
                success: function (res) {
                    if (res.status === "success") {
                        $("#paraText").val("");
                        loadTodos("all");
                    }
                }
            });
        }
    });

    $(document).on("click", ".deleteBtn", function () {
        $.ajax({
            url: "index.cfm?action=main.delete",
            type: "POST",
            dataType: "json",
            data: { id: $(this).data("id") },
            success: function (res) {
                if (res.status === "success") {
                    loadTodos("all");
                }
            }
        });
    });

    $(document).on("change", ".item", function () {
        $.ajax({
            url: "index.cfm?action=main.toggle",
            type: "POST",
            dataType: "json",
            data: {
                id: $(this).data("id"),
                isDone: $(this).is(":checked") ? 1 : 0
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

        $.each(data, function (i, t) {
            if (t.isDone == 0) left++;

            html += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <input type="checkbox" class="item me-2" data-id="${t.id}" ${t.isDone == 1 ? "checked" : ""}>
                    <span class="${t.isDone == 1 ? "text-decoration-line-through text-muted" : ""}">
                        ${t.todo_text}
                    </span>
                </div>
                <button class="deleteBtn btn btn-sm" data-id="${t.id}">✕</button>
            </li>`;
        });

        $("#todoList").html(html);
        $("#itemsLeft").text(left + " items left");
    }
});