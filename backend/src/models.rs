use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Task {
    pub id: String,
    pub title: String,
    pub description: String,
    pub completed: bool,
    #[serde(default)]
    pub assignee: Option<String>,
    #[serde(rename = "createdAt")]
    pub created_at: String,
}

#[derive(Debug, Deserialize)]
pub struct CreateTaskDto {
    pub title: Option<String>,
    pub description: Option<String>,
    pub assignee: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateTaskDto {
    pub title: Option<String>,
    pub description: Option<String>,
    pub completed: Option<bool>,
    pub assignee: Option<String>,
}
