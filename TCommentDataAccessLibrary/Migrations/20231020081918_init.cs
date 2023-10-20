using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TCommentDataAccessLibrary.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "channels",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    telegramId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    isActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_channels", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    userTelegramId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "userActivity",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    regdate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    messagetext = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    posttext = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    postlink = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    channelsid = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    userTelegramId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_userActivity", x => x.id);
                    table.ForeignKey(
                        name: "FK_userActivity_channels_channelsid",
                        column: x => x.channelsid,
                        principalTable: "channels",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_userActivity_channelsid",
                table: "userActivity",
                column: "channelsid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "userActivity");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "channels");
        }
    }
}
