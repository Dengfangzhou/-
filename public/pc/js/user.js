$(function(){

    $.ajax({
        type:"get",
        url:"/user/queryUser",
        data:{
            page:1,
            pageSize:10
        },
        success:function(res){
            // console.log(res)
            var html = template("userTpl",res)
            $(".userList").html(html)
        }
    })
    

    // 状态切换
    $(".userList").on("click",".change",function(){
        var id = $(this).attr('data-id');
        var isDelete = $(this).attr("data-isDelete")
        // console.log(id + isDelete)

        $.ajax({
            type:"post",
            url:"/user/updateUser",
            data:{
                id,
                isDelete
            },
            success:function(res){
                if(res.success){
                    location.reload();
                }
            }
        })
    })







})