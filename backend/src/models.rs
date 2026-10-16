use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Task {
    pub id: String,
    pub title: String,
    pub description: String,
    pub completed: bool,
    #[serde(rename = "createdAt")]
    pub created_at: String,
    #[serde(rename = "dueDate", skip_serializing_if = "Option::is_none")]
    pub due_date: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct CreateTaskDto {
    pub title: Option<String>,
    pub description: Option<String>,
    #[serde(rename = "dueDate")]
    pub due_date: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateTaskDto {
    pub title: Option<String>,
    pub description: Option<String>,
    pub completed: Option<bool>,
    #[serde(rename = "dueDate", default, deserialize_with = "deserialize_due_date")]
    pub due_date: Option<Option<String>>,
}

/// Allows distinguishing "field omitted" from "field explicitly set to null"
/// so clients can clear a due date by sending `"dueDate": null`.
fn deserialize_due_date<'de, D>(deserializer: D) -> Result<Option<Option<String>>, D::Error>
where
    D: serde::Deserializer<'de>,
{
    Ok(Some(Option::deserialize(deserializer)?))
}
