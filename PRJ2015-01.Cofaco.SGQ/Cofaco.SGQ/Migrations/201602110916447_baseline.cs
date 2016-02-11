namespace Cofaco.SGQ.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class baseline : DbMigration
    {
        //public override void Up() { }

        public override void Up()
        {
            CreateTable(
                "dbo.AspNetRoles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");

            CreateTable(
                "dbo.AspNetUserRoles",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        RoleId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);

            CreateTable(
                "dbo.AspNetUsers",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Type = c.Int(nullable: false),
                        Email = c.String(maxLength: 256),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex");

            CreateTable(
                "dbo.AspNetUserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(nullable: false, maxLength: 128),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);

            CreateTable(
                "dbo.AspNetUserLogins",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);

            CreateTable(
                "dbo.PROCESS_ENTITY",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedDate = c.DateTime(nullable: false),
                        CreatedBy = c.String(),
                        ModifiedBy = c.String(),
                        Ref = c.String(),
                        Title = c.String(),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.ID);

            CreateTable(
                "dbo.PROCESS_ENTITY_PROPERTY",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedDate = c.DateTime(nullable: false),
                        CreatedBy = c.String(),
                        ModifiedBy = c.String(),
                        Order = c.Int(nullable: false),
                        Name = c.String(),
                        DisplayName = c.String(),
                        Type = c.Int(nullable: false),
                        ProcessEntity_ID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.PROCESS_ENTITY", t => t.ProcessEntity_ID)
                .Index(t => t.ProcessEntity_ID);

            CreateTable(
                "dbo.PROCESS_ITEM",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedDate = c.DateTime(nullable: false),
                        CreatedBy = c.String(),
                        ModifiedBy = c.String(),
                        Entity = c.String(),
                        Properties = c.String(),
                    })
                .PrimaryKey(t => t.ID);

            CreateTable(
                "dbo.REPORTING_CHART",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Visibility = c.Int(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedDate = c.DateTime(nullable: false),
                        CreatedBy = c.String(),
                        ModifiedBy = c.String(),
                        Name = c.String(),
                        Description = c.String(),
                        Type = c.String(),
                        DataSource = c.String(),
                        Url = c.String(),
                        NameX = c.String(),
                        NameY = c.String(),
                        DisplayNameX = c.String(),
                        DisplayNameY = c.String(),
                    })
                .PrimaryKey(t => t.ID);

            CreateTable(
                "dbo.AUDIT_TEMPLATE",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Visibility = c.Int(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedDate = c.DateTime(nullable: false),
                        CreatedBy = c.String(),
                        ModifiedBy = c.String(),
                        Title = c.String(),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.ID);

            CreateTable(
                "dbo.AUDIT_QUESTION",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Visibility = c.Int(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedDate = c.DateTime(nullable: false),
                        CreatedBy = c.String(),
                        ModifiedBy = c.String(),
                        Order = c.Int(nullable: false),
                        Caption = c.String(),
                        Required = c.Boolean(nullable: false),
                        Type = c.Int(nullable: false),
                        AuditTemplate_ID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.AUDIT_TEMPLATE", t => t.AuditTemplate_ID)
                .Index(t => t.AuditTemplate_ID);

            CreateTable(
                "dbo.AUDIT_FORM",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Visibility = c.Int(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedDate = c.DateTime(nullable: false),
                        CreatedBy = c.String(),
                        ModifiedBy = c.String(),
                    })
                .PrimaryKey(t => t.ID);

            CreateTable(
                "dbo.AUDIT_ANSWER",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Visibility = c.Int(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedDate = c.DateTime(nullable: false),
                        CreatedBy = c.String(),
                        ModifiedBy = c.String(),
                        Caption = c.String(),
                        Type = c.Int(nullable: false),
                        Value_ID = c.Int(),
                        AuditForm_ID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.AUDIT_ANSWER_VALUE", t => t.Value_ID)
                .ForeignKey("dbo.AUDIT_FORM", t => t.AuditForm_ID)
                .Index(t => t.Value_ID)
                .Index(t => t.AuditForm_ID);

            CreateTable(
                "dbo.AUDIT_ANSWER_VALUE",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Visibility = c.Int(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedDate = c.DateTime(nullable: false),
                        CreatedBy = c.String(),
                        ModifiedBy = c.String(),
                        IsNull = c.Boolean(nullable: false),
                        Bool = c.Boolean(nullable: false),
                        Text = c.String(),
                        Int = c.Int(nullable: false),
                        Float = c.Double(nullable: false),
                        Date = c.DateTime(nullable: false),
                        Blob = c.Binary(),
                    })
                .PrimaryKey(t => t.ID);

            CreateTable(
                "dbo.TK_CMS_CLUSTER",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Visibility = c.Int(nullable: false),
                        CreatedBy = c.String(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedBy = c.String(),
                        ModifiedDate = c.DateTime(nullable: false),
                        Ref = c.String(),
                        Name = c.String(),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.ID);

            CreateTable(
                "dbo.TK_CMS_TYP_CONTENT_TYPE",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Visibility = c.Int(nullable: false),
                        CreatedBy = c.String(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedBy = c.String(),
                        ModifiedDate = c.DateTime(nullable: false),
                        Ref = c.String(),
                        Name = c.String(),
                        Description = c.String(),
                        Owner_ID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.TK_CMS_CLUSTER", t => t.Owner_ID, cascadeDelete: true)
                .Index(t => t.Owner_ID);

            CreateTable(
                "dbo.TK_CMS_ENT_ENTITY",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Visibility = c.Int(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedDate = c.DateTime(nullable: false),
                        CreatedBy = c.String(),
                        ModifiedBy = c.String(),
                        Ref = c.String(),
                        Name = c.String(),
                        Icon = c.String(),
                        Description = c.String(),
                        Api_ID = c.Int(),
                        Definition_ID = c.Int(),
                        Owner_ID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.WebApis", t => t.Api_ID)
                .ForeignKey("dbo.TK_CMS_ENT_DEFINITION", t => t.Definition_ID)
                .ForeignKey("dbo.TK_CMS_CLUSTER", t => t.Owner_ID, cascadeDelete: true)
                .Index(t => t.Api_ID)
                .Index(t => t.Definition_ID)
                .Index(t => t.Owner_ID);

            CreateTable(
                "dbo.WebApis",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        CreatedDate = c.DateTime(nullable: false),
                        CreatedBy = c.String(),
                        ModifiedDate = c.DateTime(nullable: false),
                        ModifiedBy = c.String(),
                        Create = c.String(),
                        Detail = c.String(),
                        List = c.String(),
                        Update = c.String(),
                        Delete = c.String(),
                    })
                .PrimaryKey(t => t.ID);

            CreateTable(
                "dbo.TK_CMS_ENT_DEFINITION",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        CreatedDate = c.DateTime(nullable: false),
                        CreatedBy = c.String(),
                        ModifiedDate = c.DateTime(nullable: false),
                        ModifiedBy = c.String(),
                    })
                .PrimaryKey(t => t.ID);

            CreateTable(
                "dbo.TK_CMS_ENT_FORM",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Visibility = c.Int(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedDate = c.DateTime(nullable: false),
                        CreatedBy = c.String(),
                        ModifiedBy = c.String(),
                        Type = c.Int(nullable: false),
                        Name = c.String(),
                        Description = c.String(),
                        Url = c.String(),
                        Icon = c.String(),
                        Owner_ID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.TK_CMS_ENT_ENTITY", t => t.Owner_ID, cascadeDelete: true)
                .Index(t => t.Owner_ID);

            CreateTable(
                "dbo.TK_CMS_ENT_SCHEMA",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Visibility = c.Int(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedDate = c.DateTime(nullable: false),
                        CreatedBy = c.String(),
                        ModifiedBy = c.String(),
                        Type = c.Int(nullable: false),
                        Name = c.String(),
                        Description = c.String(),
                        Owner_ID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.TK_CMS_ENT_ENTITY", t => t.Owner_ID, cascadeDelete: true)
                .Index(t => t.Owner_ID);

            CreateTable(
                "dbo.TK_CMS_ENT_PROPERTY",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Visibility = c.Int(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedDate = c.DateTime(nullable: false),
                        CreatedBy = c.String(),
                        ModifiedBy = c.String(),
                        IsKey = c.Boolean(nullable: false),
                        Name = c.String(),
                        DisplayName = c.String(),
                        Description = c.String(),
                        Type = c.String(),
                        Required = c.Boolean(nullable: false),
                        Editable = c.Boolean(nullable: false),
                        Owner_ID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.TK_CMS_ENT_SCHEMA", t => t.Owner_ID, cascadeDelete: true)
                .Index(t => t.Owner_ID);

            CreateTable(
                "dbo.TK_CMS_ENT_VIEW",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Visibility = c.Int(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedDate = c.DateTime(nullable: false),
                        CreatedBy = c.String(),
                        ModifiedBy = c.String(),
                        Ref = c.String(),
                        IsDefault = c.Boolean(nullable: false),
                        Name = c.String(),
                        Description = c.String(),
                        Owner_ID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.TK_CMS_ENT_ENTITY", t => t.Owner_ID, cascadeDelete: true)
                .Index(t => t.Owner_ID);

            CreateTable(
                "dbo.TK_CMS_ENT_VIEW_FIELD",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Visibility = c.Int(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedDate = c.DateTime(nullable: false),
                        CreatedBy = c.String(),
                        ModifiedBy = c.String(),
                        Name = c.String(),
                        DisplayName = c.String(),
                        Owner_ID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.TK_CMS_ENT_VIEW", t => t.Owner_ID, cascadeDelete: true)
                .Index(t => t.Owner_ID);

            CreateTable(
                "dbo.TK_LOG_ENTRY",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        CreatedDate = c.DateTime(nullable: false),
                        CreatedBy = c.String(),
                        Logger = c.String(),
                        PayLoad = c.String(),
                        State = c.Int(nullable: false),
                        Message = c.String(),
                        Owner = c.String(),
                        Level = c.Int(nullable: false),
                        Action = c.String(),
                    })
                .PrimaryKey(t => t.ID);

            CreateTable(
                "dbo.TK_COMM_NOTIFICATION_EVENT",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Type = c.String(),
                        From = c.String(),
                        Target = c.String(),
                        Message = c.String(),
                        PayLoad = c.String(),
                        CreatedDate = c.DateTime(nullable: false),
                        State = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID);

            CreateTable(
                "dbo.TK_COMM_NOTIFICATION",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Owner = c.String(),
                        State = c.Int(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedDate = c.DateTime(nullable: false),
                        Event_ID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.TK_COMM_NOTIFICATION_EVENT", t => t.Event_ID)
                .Index(t => t.Event_ID);

            CreateTable(
                "dbo.TK_TICKER_ENTRY",
                c => new
                    {
                        ID = c.String(nullable: false, maxLength: 128),
                        Visibility = c.Int(nullable: false),
                        CreatedBy = c.String(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedBy = c.String(),
                        ModifiedDate = c.DateTime(nullable: false),
                        Name = c.String(),
                        Description = c.String(),
                        Type = c.String(),
                    })
                .PrimaryKey(t => t.ID);

            CreateTable(
                "dbo.TK_TICKER_RUNTIME",
                c => new
                    {
                        ID = c.String(nullable: false, maxLength: 128),
                        NumOfExecutions = c.Int(nullable: false),
                        LastExecutionDate = c.DateTime(),
                    })
                .PrimaryKey(t => t.ID);

            CreateTable(
                "dbo.TK_LOC_RESOURCE",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Visibility = c.Int(nullable: false),
                        CreatedBy = c.String(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedBy = c.String(),
                        ModifiedDate = c.DateTime(nullable: false),
                        Bundle = c.String(),
                        Locale = c.String(),
                        Key = c.String(),
                        Value = c.String(),
                    })
                .PrimaryKey(t => t.ID);

            CreateTable(
                "dbo.TK_LOC_CULTURE",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        IsDefault = c.Boolean(nullable: false),
                        Key = c.String(),
                        Name = c.String(),
                        Thumbnail = c.String(),
                        UrlFragment = c.String(),
                    })
                .PrimaryKey(t => t.ID);

            CreateTable(
                "dbo.TK_IMS_MENU",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Visibility = c.Int(nullable: false),
                        CreatedBy = c.String(),
                        CreatedDate = c.DateTime(nullable: false),
                        ModifiedBy = c.String(),
                        ModifiedDate = c.DateTime(nullable: false),
                        Menu = c.String(),
                        Name = c.String(),
                        Style = c.String(),
                        Icon = c.String(),
                        Description = c.String(),
                        Url = c.String(),
                        Action = c.String(),
                    })
                .PrimaryKey(t => t.ID);

        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TK_COMM_NOTIFICATION", "Event_ID", "dbo.TK_COMM_NOTIFICATION_EVENT");
            DropForeignKey("dbo.TK_CMS_ENT_ENTITY", "Owner_ID", "dbo.TK_CMS_CLUSTER");
            DropForeignKey("dbo.TK_CMS_ENT_VIEW", "Owner_ID", "dbo.TK_CMS_ENT_ENTITY");
            DropForeignKey("dbo.TK_CMS_ENT_VIEW_FIELD", "Owner_ID", "dbo.TK_CMS_ENT_VIEW");
            DropForeignKey("dbo.TK_CMS_ENT_SCHEMA", "Owner_ID", "dbo.TK_CMS_ENT_ENTITY");
            DropForeignKey("dbo.TK_CMS_ENT_PROPERTY", "Owner_ID", "dbo.TK_CMS_ENT_SCHEMA");
            DropForeignKey("dbo.TK_CMS_ENT_FORM", "Owner_ID", "dbo.TK_CMS_ENT_ENTITY");
            DropForeignKey("dbo.TK_CMS_ENT_ENTITY", "Definition_ID", "dbo.TK_CMS_ENT_DEFINITION");
            DropForeignKey("dbo.TK_CMS_ENT_ENTITY", "Api_ID", "dbo.WebApis");
            DropForeignKey("dbo.TK_CMS_TYP_CONTENT_TYPE", "Owner_ID", "dbo.TK_CMS_CLUSTER");
            DropForeignKey("dbo.AUDIT_ANSWER", "AuditForm_ID", "dbo.AUDIT_FORM");
            DropForeignKey("dbo.AUDIT_ANSWER", "Value_ID", "dbo.AUDIT_ANSWER_VALUE");
            DropForeignKey("dbo.AUDIT_QUESTION", "AuditTemplate_ID", "dbo.AUDIT_TEMPLATE");
            DropForeignKey("dbo.PROCESS_ENTITY_PROPERTY", "ProcessEntity_ID", "dbo.PROCESS_ENTITY");
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropIndex("dbo.TK_COMM_NOTIFICATION", new[] { "Event_ID" });
            DropIndex("dbo.TK_CMS_ENT_VIEW_FIELD", new[] { "Owner_ID" });
            DropIndex("dbo.TK_CMS_ENT_VIEW", new[] { "Owner_ID" });
            DropIndex("dbo.TK_CMS_ENT_PROPERTY", new[] { "Owner_ID" });
            DropIndex("dbo.TK_CMS_ENT_SCHEMA", new[] { "Owner_ID" });
            DropIndex("dbo.TK_CMS_ENT_FORM", new[] { "Owner_ID" });
            DropIndex("dbo.TK_CMS_ENT_ENTITY", new[] { "Owner_ID" });
            DropIndex("dbo.TK_CMS_ENT_ENTITY", new[] { "Definition_ID" });
            DropIndex("dbo.TK_CMS_ENT_ENTITY", new[] { "Api_ID" });
            DropIndex("dbo.TK_CMS_TYP_CONTENT_TYPE", new[] { "Owner_ID" });
            DropIndex("dbo.AUDIT_ANSWER", new[] { "AuditForm_ID" });
            DropIndex("dbo.AUDIT_ANSWER", new[] { "Value_ID" });
            DropIndex("dbo.AUDIT_QUESTION", new[] { "AuditTemplate_ID" });
            DropIndex("dbo.PROCESS_ENTITY_PROPERTY", new[] { "ProcessEntity_ID" });
            DropIndex("dbo.AspNetUserLogins", new[] { "UserId" });
            DropIndex("dbo.AspNetUserClaims", new[] { "UserId" });
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
            DropIndex("dbo.AspNetUserRoles", new[] { "RoleId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "UserId" });
            DropIndex("dbo.AspNetRoles", "RoleNameIndex");
            DropTable("dbo.TK_IMS_MENU");
            DropTable("dbo.TK_LOC_CULTURE");
            DropTable("dbo.TK_LOC_RESOURCE");
            DropTable("dbo.TK_TICKER_RUNTIME");
            DropTable("dbo.TK_TICKER_ENTRY");
            DropTable("dbo.TK_COMM_NOTIFICATION");
            DropTable("dbo.TK_COMM_NOTIFICATION_EVENT");
            DropTable("dbo.TK_LOG_ENTRY");
            DropTable("dbo.TK_CMS_ENT_VIEW_FIELD");
            DropTable("dbo.TK_CMS_ENT_VIEW");
            DropTable("dbo.TK_CMS_ENT_PROPERTY");
            DropTable("dbo.TK_CMS_ENT_SCHEMA");
            DropTable("dbo.TK_CMS_ENT_FORM");
            DropTable("dbo.TK_CMS_ENT_DEFINITION");
            DropTable("dbo.WebApis");
            DropTable("dbo.TK_CMS_ENT_ENTITY");
            DropTable("dbo.TK_CMS_TYP_CONTENT_TYPE");
            DropTable("dbo.TK_CMS_CLUSTER");
            DropTable("dbo.AUDIT_ANSWER_VALUE");
            DropTable("dbo.AUDIT_ANSWER");
            DropTable("dbo.AUDIT_FORM");
            DropTable("dbo.AUDIT_QUESTION");
            DropTable("dbo.AUDIT_TEMPLATE");
            DropTable("dbo.REPORTING_CHART");
            DropTable("dbo.PROCESS_ITEM");
            DropTable("dbo.PROCESS_ENTITY_PROPERTY");
            DropTable("dbo.PROCESS_ENTITY");
            DropTable("dbo.AspNetUserLogins");
            DropTable("dbo.AspNetUserClaims");
            DropTable("dbo.AspNetUsers");
            DropTable("dbo.AspNetUserRoles");
            DropTable("dbo.AspNetRoles");
        }
    }
}
