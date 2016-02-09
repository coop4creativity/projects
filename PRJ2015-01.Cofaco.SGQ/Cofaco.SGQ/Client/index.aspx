<%@ Page Title="" Language="C#" Inherits="Toolkit.Apps.Web.Framework.View.Page" %>

<!DOCTYPE html>
<html data-ng-app="app" xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>
        <framework:AppName runat="server" />
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
    <!-- ICON -->
    <link rel="apple-touch-icon" sizes="57x57" href="<%= Ctx.Resolver.ResolveUrl("~/Data/Images/Icon/apple-icon-57x57.png")%>" />
    <link rel="apple-touch-icon" sizes="60x60" href="<%= Ctx.Resolver.ResolveUrl("~/Data/Images/Icon/apple-icon-60x60.png")%>" />
    <link rel="apple-touch-icon" sizes="72x72" href="<%= Ctx.Resolver.ResolveUrl("~/Data/Images/Icon/apple-icon-72x72.png")%>" />
    <link rel="apple-touch-icon" sizes="76x76" href="<%= Ctx.Resolver.ResolveUrl("~/Data/Images/Icon/apple-icon-76x76.png")%>" />
    <link rel="apple-touch-icon" sizes="114x114" href="<%= Ctx.Resolver.ResolveUrl("~/Data/Images/Icon/apple-icon-114x114.png")%>" />
    <link rel="apple-touch-icon" sizes="120x120" href="<%= Ctx.Resolver.ResolveUrl("~/Data/Images/Icon/apple-icon-120x120.png")%>" />
    <link rel="apple-touch-icon" sizes="144x144" href="<%= Ctx.Resolver.ResolveUrl("~/Data/Images/Icon/apple-icon-144x144.png")%>" />
    <link rel="apple-touch-icon" sizes="152x152" href="<%= Ctx.Resolver.ResolveUrl("~/Data/Images/Icon/apple-icon-152x152.png")%>" />
    <link rel="apple-touch-icon" sizes="180x180" href="<%= Ctx.Resolver.ResolveUrl("~/Data/Images/Icon/apple-icon-180x180.png")%>" />
    <link rel="icon" type="image/png" sizes="192x192" href="<%= Ctx.Resolver.ResolveUrl("~/Data/Images/Icon/android-icon-192x192.png")%>" />
    <link rel="icon" type="image/png" sizes="32x32" href="<%= Ctx.Resolver.ResolveUrl("~/Data/Images/Icon/favicon-32x32.png")%>" />
    <link rel="icon" type="image/png" sizes="96x96" href="<%= Ctx.Resolver.ResolveUrl("~/Data/Images/Icon/favicon-96x96.png")%>" />
    <link rel="icon" type="image/png" sizes="16x16" href="<%= Ctx.Resolver.ResolveUrl("~/Data/Images/Icon/favicon-16x16.png")%>" />
    <link rel="shortcut icon" href="<%= Ctx.Resolver.ResolveUrl("~/Data/Images/Icon/favicon.ico")%>" type="image/x-icon" />
    <link rel="icon" href="<%= Ctx.Resolver.ResolveUrl("~/Data/Images/Icon/favicon.ico")%>" type="image/x-icon" />
    <link rel="manifest" href="<%= Ctx.Resolver.ResolveUrl("~/Data/Images/Icon/manifest.json")%>" />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="msapplication-TileImage" href="<%= Ctx.Resolver.ResolveUrl("~/Data/Images/Icon/ms-icon-144x144.png")%>" />
    <meta name="theme-color" content="#ffffff" />
    <!-- CLOUD -->
    <link rel='stylesheet' type='text/css' href='http://fonts.googleapis.com/css?family=Oswald' />
    <framework:Package runat="server" Name="3party:angular" Mode="HERE" MimeType="text/css" />
    <framework:Package runat="server" Name="3party:bootstrap:334" Mode="HERE" MimeType="text/css" />
    <framework:Package runat="server" Name="3party:angular" Mode="HERE" MimeType="text/css" />
    <framework:StyleIncludeFolder runat="server" Folder="~/Client" Pattern="*.css" Mode="HERE" Recursive="true" />
    <!--[if lt IE 9]>
    <framework:Package runat="server" Name="3party:html5" Mode="HERE" MimeType="application/javascript" />
    <![endif]-->
</head>
<body>
    <!-- TOP-BAR -->
    <div data-ng-controller='tkNavbarController'>
        <tk-navbar visible="isLoggedUser" affixed='config.affixed' brand='config.brand' inverse='config.inverse' menu='config.menu' navfn='config.navfn(item)' search='config.search' searchfn='config.search.fn()' />
    </div>
    <!-- MAIN -->
    <div class="container">
        <div data-ng-view=""></div>
    </div>
    <!-- SCRIPTS -->
    <framework:Package runat="server" Name="3party:jquery:1112" Mode="HERE" MimeType="application/javascript" />
    <framework:Package runat="server" Name="3party:bootstrap:334" Mode="HERE" MimeType="application/javascript" />
    <framework:Package runat="server" Name="3party:angular:138" Mode="HERE" MimeType="application/javascript" />
    <framework:Package runat="server" Name="3party:angular:ui-bootstrap:0121" Mode="HERE" MimeType="application/javascript" />
    <framework:Package runat="server" Name="3party:angular" Mode="HERE" MimeType="application/javascript" />
    <framework:Package runat="server" Name="toolkit:base:core" Mode="HERE" MimeType="application/javascript" />
    <!-- CLOUD RESOURCES -->
    <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular-sanitize.js"></script>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?&libraries=drawing"></script>
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script>google.load("visualization", "1", { packages: ["corechart"] });</script>
    <script type="text/javascript">toolkit.url.Register(null, '<%= ResolveUrl("~/") %>');</script>
    <script>
        var __NAME = '<%= Ctx.AppContext.Config.Name %>';
        var __DESCRIPTION = '<%= Ctx.AppContext.Config.Description %>';
        var __ICON = '<%= Ctx.AppContext.Config.IconUrl %>';
        var __PATH = '<%= Ctx.Resolver.ResolveUrl("~/Client/") %>';
    </script>
    <!-- TOOLKIT ANGULAR -->
    <framework:Package runat="server" Name="toolkit:angular:core" Mode="HERE" MimeType="application/javascript" />
    <framework:Package runat="server" Name="toolkit:angular:auth" Mode="HERE" MimeType="application/javascript" />
    <framework:Package runat="server" Name="toolkit:angular:models" Mode="HERE" MimeType="application/javascript" />
    <!-- ANGULAR COMPONENTS -->
    <framework:ScriptIncludeFolder runat="server" Folder="~/Client/support" Pattern="*.js" Mode="HERE" />
    <framework:ScriptIncludeFolder runat="server" Folder="~/Client/modules" Pattern="*.js" Mode="HERE" Recursive="true" />
    <framework:ScriptIncludeFolder runat="server" Folder="~/Client" Pattern="*.js" Mode="HERE" />
    <framework:ScriptIncludeFolder runat="server" Folder="~/Client/main" Pattern="*.js" Mode="HERE" />
</body>
</html>


