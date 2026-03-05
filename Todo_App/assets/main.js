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
                data: {
                    todo_text: txt
                },
                success: function (res) {

                    if (res.status === "success") {

                        var newItem = `
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <input type="checkbox" class="item me-2" data-id="${res.id}">
                                <span>${txt}</span>
                            </div>
                            <button class="deleteBtn btn btn-sm" data-id="${res.id}">✕</button>
                        </li>`;

                        $("#todosContainer").prepend(newItem);
                        $("#paraText").val("");
                        updateItemsLeft();
                    }
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
            data: {
                id: id
            },
            success: function (res) {
                if (res.status === "success") {
                    $('button[data-id="' + id + '"]').closest("li").remove();
                    updateItemsLeft();
                }
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
            data: {
                id: id,
                isDone: done
            }
        });

        if (done == 1) {
            $(this).siblings("span").addClass("text-decoration-line-through text-muted");
        } else {
            $(this).siblings("span").removeClass("text-decoration-line-through text-muted");
        }

        updateItemsLeft();
    });

    $("#allBtn").click(function () { loadTodos("all"); });
    $("#activeBtn").click(function () { loadTodos("active"); });
    $("#completedBtn").click(function () { loadTodos("completed"); });

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
            data: {
                type: type
            },
            success: function (data) {
                renderTodos(data);
            }
        });

    }

    function renderTodos(data) {

        var html = "";
        var left = 0;

        $.each(data, function (i, t) {

            if (t.ISDONE == 0) left++;

            html += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <input type="checkbox" class="item me-2" data-id="${t.ID}" ${t.ISDONE == 1 ? "checked" : ""}>
                    <span class="${t.ISDONE == 1 ? "text-decoration-line-through text-muted" : ""}">
                        ${t.TODO_TEXT}
                    </span>
                </div>
                <button class="deleteBtn btn btn-sm" data-id="${t.ID}">✕</button>
            </li>`;
        });

        $("#todosContainer").html(html);
        $("#itemsLeft").text(left + " items left");
    }

    function updateItemsLeft() {

        var left = $(".item:not(:checked)").length;
        $("#itemsLeft").text(left + " items left");

    }

});