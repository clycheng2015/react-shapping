<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>网关支付产品示例</title>
  <link rel="stylesheet" href="static/jquery-ui.min.css">
  <script src="static/jquery-1.11.2.min.js"></script>
  <script src="static/jquery-ui.min.js"></script>
  <script src="static/demo.js"></script>
  <script>
  	$(function() {
	    setApiDemoTabs("#tabs-purchase");
	    setApiDemoTabs("#tabs-preauth");
	  });
  </script>
  <link rel="stylesheet" href="static/demo.css">
</head>

<body style="background-color:#e5eecc;">
<div id="wrapper">
<div id="header">
<h2>网关支付产品示例</h2>

</div>

<div id="tabs-api">
  <ul>
    <li><a href="#tabs-api-1">前言</a></li>
    <li><a href="#tabs-api-2">消费样例</a></li>
    <li><a href="#tabs-api-4">预授权样例</a></li>
    <li><a href="#tabs-api-3">常见开发问题</a></li>
  </ul>
  
  <div id="tabs-api-1">
    <jsp:include  page="/pages/introduction.jsp"/>
  </div>

  <div id="tabs-api-2">
	<div id="tabs-purchase">
	  <ul>
	    <li><a href="#tabs-purchase-1">说明</a></li>
	    <li><a href="pages/consume.jsp">消费</a></li>
	    <li><a href="pages/consumeUndo.jsp">消费撤销</a></li>
	    <li><a href="pages/refund.jsp">退货</a></li>
		<li><a href="pages/query.jsp">交易状态查询</a></li>
		<li><a href="pages/file_transfer.jsp">对账文件下载</a></li>
	  </ul>
	  <div id="tabs-purchase-1">
	     <jsp:include  page="/pages/consume_intro.jsp"/>
	  </div>
	</div>
  </div>

  <div id="tabs-api-4">
	<div id="tabs-preauth">
	  <ul>
	    <li><a href="#tabs-preauth-1">说明</a></li>
	    <li><a href="pages/preauth.jsp">预授权</a></li>
	    <li><a href="pages/preauthFinish.jsp">预授权完成</a></li>
	    <li><a href="pages/preauthUndo.jsp">预授权撤销</a></li>
	    <li><a href="pages/preauthFinishUndo.jsp">预授权完成撤销</a></li>
		<li><a href="pages/query.jsp">交易状态查询</a></li>
		<li><a href="pages/file_transfer.jsp">对账文件下载</a></li>
	  </ul>
	  <div id="tabs-preauth-1">
	     <jsp:include  page="/pages/preauth_intro.jsp"/>
	  </div>
	</div>
  </div>

  <div id="tabs-api-3">
    <jsp:include  page="/pages/devlopHelp.jsp"/>
  </div>
	  
  </div> <!-- end of tabs-api-->
</div><!-- end of wrapper-->
 
 
</body>
</html>