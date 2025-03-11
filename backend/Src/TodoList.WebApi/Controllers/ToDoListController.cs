﻿using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using TodoList.WebApi.DataTransferObjects;
using TodoList.WebApi.Services;

namespace TodoList.WebApi.Controllers
{
    public class ToDoController : Controller
    {
        private readonly IToDoService _service;
        public ToDoController(IToDoService service)
        {
            _service = service;
        }
        [HttpGet]
        [Route("todo")]
        public async Task<IActionResult> Get()
        {
            var response = await _service.GetAll();
            return Ok(response);
        }

        [HttpPost]
        [Route("todo")]
        public async Task<IActionResult> Add([FromBody] ToDoListAssignmentDTO toDoListAssignmentDTO)
        {
            var response = await _service.AddToDo(toDoListAssignmentDTO);
            if (response == null)
            {
                return BadRequest("Could not add item");
            }
            return Ok(response);
        }

        [HttpDelete]
        [Route("todo/{id}")]
        public async Task<IActionResult> Delete ([FromRoute] int id)
        {
            var response = await _service.DeleteToDo(id);
            return Ok(response);
        }

        [HttpPut]
        [Route("todo/{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] ToDoListAssignmentDTO toDoDto)
        {
            var updatedNote = await _service.UpdateToDo(id, toDoDto);

            if (updatedNote == null)
            {
                return NotFound("Task not found.");
            }

            return Ok(updatedNote);
        }
    }
}
