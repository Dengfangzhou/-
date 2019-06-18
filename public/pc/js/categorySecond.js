$(function(){

    // 初始化数据
    var page = 1;
    var pageSize = 3;
    var totalPage = 0;

    getData()

    $("#nextBtn").on('click',function(){
        page++
        if(page>totalPage){
            page = totalPage;
            alert("最后一页了")
            return
        }
        getData()
    })

    $("#prevBtn").on('click',function(){
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
            url:"/category/querySecondCategoryPaging",
            data:{
                page,
                pageSize
            },
            success:function(res){
                // console.log(res)
                var html = template("categorySecondTpl",res)
                totalPage = Math.ceil(res.total/pageSize)
                $(".categorySecondList").html(html)
            }
        })
    }

    
    // 一级分类
    $.ajax({
        type:"get",
        url:"/category/queryTopCategoryPaging",
        data:{
            page:1,
            pageSize:100
        },
        success:function(res){
            // console.log(res)
            var html = "";
            res.rows.forEach(function(value){
                html += "<option value='"+value.id+"'>"+value.categoryName+"</option>"
            })
            
            $("#categoryFirstList").html(html)
        }
    })

    
    // 图片上传功能
    $('#fileupload').fileupload({
        dataType: 'json',
        url: "/category/addSecondCategoryPic",//文件的后台接受地址
        //上传完成之后的操作，显示在img里面
        done: function (e, data){
            // console.log(data)
           $("#preview").attr("src",data.result.picAddr)
           $("#preview").css({width: "400px", height: "400px"});
        }
    });





})