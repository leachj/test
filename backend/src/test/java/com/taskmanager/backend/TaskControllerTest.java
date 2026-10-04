package com.taskmanager.backend;

import static org.hamcrest.Matchers.empty;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.instanceOf;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.taskmanager.backend.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@SpringBootTest
@AutoConfigureMockMvc
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TaskService taskService;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void clearTasks() {
        taskService.clearTasks();
    }

    @Test
    void healthReturnsOkStatus() throws Exception {
        mockMvc.perform(get("/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("ok"));
    }

    @Test
    void getTasksReturnsEmptyArrayWhenNoTasksExist() throws Exception {
        mockMvc.perform(get("/api/tasks"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", empty()));
    }

    @Test
    void getTasksReturnsAllTasks() throws Exception {
        createTask("Task 1", null);
        createTask("Task 2", null);

        mockMvc.perform(get("/api/tasks"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    void postTasksCreatesATaskWithTitle() throws Exception {
        mockMvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"My Task\",\"description\":\"Some description\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("My Task"))
                .andExpect(jsonPath("$.description").value("Some description"))
                .andExpect(jsonPath("$.completed").value(false))
                .andExpect(jsonPath("$.id", instanceOf(String.class)))
                .andExpect(jsonPath("$.createdAt", notNullValue()));
    }

    @Test
    void postTasksReturns400WhenTitleIsMissing() throws Exception {
        mockMvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"description\":\"no title\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void postTasksReturns400WhenTitleIsEmpty() throws Exception {
        mockMvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"   \"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void getTaskByIdReturnsTask() throws Exception {
        String id = createTask("Find me", null);

        mockMvc.perform(get("/api/tasks/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Find me"));
    }

    @Test
    void getTaskByIdReturns404ForUnknownId() throws Exception {
        mockMvc.perform(get("/api/tasks/nonexistent")).andExpect(status().isNotFound());
    }

    @Test
    void patchTaskUpdatesFields() throws Exception {
        String id = createTask("Original", null);

        mockMvc.perform(patch("/api/tasks/{id}", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"Updated\",\"completed\":true}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Updated"))
                .andExpect(jsonPath("$.completed").value(true));
    }

    @Test
    void patchTaskReturns404ForUnknownId() throws Exception {
        mockMvc.perform(patch("/api/tasks/nonexistent")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"x\"}"))
                .andExpect(status().isNotFound());
    }

    @Test
    void deleteTaskDeletesATask() throws Exception {
        String id = createTask("Delete me", null);

        mockMvc.perform(delete("/api/tasks/{id}", id)).andExpect(status().isNoContent());
        mockMvc.perform(get("/api/tasks/{id}", id)).andExpect(status().isNotFound());
    }

    @Test
    void deleteTaskReturns404ForUnknownId() throws Exception {
        mockMvc.perform(delete("/api/tasks/nonexistent")).andExpect(status().isNotFound());
    }

    @Test
    void postTasksTrimsLeadingAndTrailingWhitespaceFromTitle() throws Exception {
        mockMvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"  Padded title  \"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Padded title"));
    }

    @Test
    void postTasksTrimsLeadingAndTrailingWhitespaceFromDescription() throws Exception {
        mockMvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"Task\",\"description\":\"  padded  \"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.description").value("padded"));
    }

    @Test
    void postTasksDefaultsDescriptionToEmptyStringWhenOmitted() throws Exception {
        mockMvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"No description\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.description").value(""));
    }

    @Test
    void postTasksReturns400WhenTitleIsAbsentFromAnEmptyBody() throws Exception {
        mockMvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error.message").value("Title is required"))
                .andExpect(jsonPath("$.error.statusCode").value(400));
    }

    @Test
    void postTasksAssignsDistinctIdsToEachTask() throws Exception {
        String firstId = createTask("Task 1", null);
        String secondId = createTask("Task 2", null);

        org.assertj.core.api.Assertions.assertThat(firstId).isNotEqualTo(secondId);
    }

    @Test
    void getTaskByIdReturns404WithErrorBodyForUnknownId() throws Exception {
        mockMvc.perform(get("/api/tasks/nonexistent"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error.message").value("Task not found"))
                .andExpect(jsonPath("$.error.statusCode").value(404));
    }

    @Test
    void patchTaskUpdatesOnlyTitleWhenOnlyTitleProvided() throws Exception {
        String id = createTask("Original title", "Original description");

        mockMvc.perform(patch("/api/tasks/{id}", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"New title\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("New title"))
                .andExpect(jsonPath("$.description").value("Original description"))
                .andExpect(jsonPath("$.completed").value(false));
    }

    @Test
    void patchTaskUpdatesOnlyDescriptionWhenOnlyDescriptionProvided() throws Exception {
        String id = createTask("Title", "Original description");

        mockMvc.perform(patch("/api/tasks/{id}", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"description\":\"New description\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Title"))
                .andExpect(jsonPath("$.description").value("New description"));
    }

    @Test
    void patchTaskUpdatesOnlyCompletedWhenOnlyCompletedProvided() throws Exception {
        String id = createTask("Title", null);

        mockMvc.perform(patch("/api/tasks/{id}", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"completed\":true}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Title"))
                .andExpect(jsonPath("$.completed").value(true));
    }

    @Test
    void patchTaskCanToggleCompletedBackToFalse() throws Exception {
        String id = createTask("Title", null);
        mockMvc.perform(patch("/api/tasks/{id}", id)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"completed\":true}"));

        mockMvc.perform(patch("/api/tasks/{id}", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"completed\":false}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.completed").value(false));
    }

    @Test
    void patchTaskWithEmptyBodyLeavesFieldsUnchanged() throws Exception {
        String id = createTask("Title", "Description");

        mockMvc.perform(patch("/api/tasks/{id}", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Title"))
                .andExpect(jsonPath("$.description").value("Description"))
                .andExpect(jsonPath("$.completed").value(false));
    }

    @Test
    void patchTaskReturns404WithErrorBodyForUnknownId() throws Exception {
        mockMvc.perform(patch("/api/tasks/nonexistent")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"x\"}"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error.message").value("Task not found"))
                .andExpect(jsonPath("$.error.statusCode").value(404));
    }

    @Test
    void deleteTaskDoesNotAffectOtherTasks() throws Exception {
        String keepId = createTask("Keep me", null);
        String deleteId = createTask("Delete me", null);

        mockMvc.perform(delete("/api/tasks/{id}", deleteId)).andExpect(status().isNoContent());

        mockMvc.perform(get("/api/tasks")).andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(1)));
        mockMvc.perform(get("/api/tasks/{id}", keepId)).andExpect(status().isOk());
    }

    @Test
    void deleteTaskReturns404WithErrorBodyForUnknownId() throws Exception {
        mockMvc.perform(delete("/api/tasks/nonexistent"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error.message").value("Task not found"))
                .andExpect(jsonPath("$.error.statusCode").value(404));
    }

    @Test
    void deletingTheSameTaskTwiceReturns404OnSecondAttempt() throws Exception {
        String id = createTask("Delete me twice", null);

        mockMvc.perform(delete("/api/tasks/{id}", id)).andExpect(status().isNoContent());
        mockMvc.perform(delete("/api/tasks/{id}", id)).andExpect(status().isNotFound());
    }

    private String createTask(String title, String description) throws Exception {
        String body = objectMapper.writeValueAsString(new java.util.HashMap<String, String>() {
            {
                put("title", title);
                if (description != null) {
                    put("description", description);
                }
            }
        });

        MvcResult result = mockMvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isCreated())
                .andReturn();

        return objectMapper
                .readTree(result.getResponse().getContentAsString())
                .get("id")
                .asText();
    }
}
