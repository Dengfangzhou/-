$(function(){

    // 初始化数据
    var page = 1;
    var pageSize = 3;
    var totalPage = 0;

    getData()


    $(".next").on('click',function(){
        page++
        if(page>totalPage){
            page = totalPage;
            alert("最后一页了")
            return
        }
        getData()
    })

    $(".prev").on('click',function(){
        page--
        if(page<1){
            page = 1;
            alert("第一页了")
            return
        }
        getData()
    })

    function getData(){
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page,
                pageSize
            },
            success:function(res){
                console.log(res)
                var html = template("categoryFirstTpl",res)
                totalPage = Math.ceil(res.total/pageSize)
                $(".categoryFirstList").html(html)
            }
        })
    }

    $(".save").on("click",function(){
        var firstCategoryName = $("#firstCategory").val();

        $.ajax({
            type:'post',
            url:"/category/addTopCategory",
            data:{
                categoryName:firstCategoryName
            },
            success:function(res){
               if(res.success){
                   location.reload();
               }
            }

        })

    })







})