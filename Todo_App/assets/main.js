$(document).ready(function(){
    $("#paraText").on("keydown", function(e){
         if (event.key === "Enter" || event.keyCode === 13) {
            e.preventDefault();
            if($("#paraText").val() == ""){
                $("#msg").text("Please enter a todo item.");
                return;
            }
            $.ajax({
            url: "index.cfm?action=main.save",
            type: "post",
            dataType:"json",
            data: {
                todo_text: $("#paraText").val()
            },
            success: function(res){
                if(res.status == "success"){
                    $("#paraText").val("");
                    window.location.href = "index.cfm?action=main.default";
                } else {
                    $("#msg").text("Failed to add todo item.");
                }
            }
        });
    }
    });
    $(document).on("click", "#deleteBtn", function(){
        var todoId = $(this).val();
        $.ajax({
            url: "index.cfm?action=main.delete",
            type: "post",
            dataType:"json",
            data: {
                id: todoId
            },
            success: function(res){
                if(res.status == "success"){
                    $("#msg").text("Todo item deleted successfully.");
                    window.location.href = "index.cfm?action=main.default";
                } else {
                    $("#msg").text("Failed to delete todo item.");
                }
            }
        });
    });
    $('#checkAll').click(function(){
        $('.item').prop('checked', this.checked);
        updateServer();
    });
    $('.item').click(function(){
        updateServer();
    });
    function updateServer() {
        var checkedItems = $('.item:checked').map(function(){
            return $(this).val();
        }).get();
        $.ajax({
            url: 'index.cfm?action=main.updateCheckboxes',
            type: 'POST',
            data: {
                id: checkedItems.join(','),
                isDone: checkedItems.length > 0 ? 1 : 0
            },
            success: function(res){
                if(res.status == "success"){
                    window.location.href = "index.cfm?action=main.default";
                    $("#msg").text("Todo item updated successfully.");
                } else {
                    $("#msg").text("Failed to update todo item.");
                }
            }
        });
    }
});