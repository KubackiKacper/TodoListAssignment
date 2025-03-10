﻿using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TodoList.WebApi.DataTransferObjects
{
    public class ToDoListAssignmentDTO
    {
        
        [Required]
        [MaxLength(255)]
        [JsonPropertyName("description")]
        public string Description { get; set; }
    }
}
