using Microsoft.EntityFrameworkCore;
using StudentManagmentSYS.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// ✅ Register the InMemory database
builder.Services.AddDbContext<AppDataBase>(options =>
    options.UseInMemoryDatabase("StudentDB"));

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy => policy.WithOrigins("http://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

var app = builder.Build();
app.UseCors("AllowAngularApp");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers(); // 👈 This makes [ApiController] routes active


app.Run();

