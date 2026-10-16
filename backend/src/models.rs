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
    // Wrapped in an Option so a PATCH body can distinguish "field omitted"
    // (leave unchanged) from "field present and set to null" (clear due date).
    #[serde(
        rename = "dueDate",
        default,
        deserialize_with = "deserialize_optional_field"
    )]
    pub due_date: Option<Option<String>>,
}

fn deserialize_optional_field<'de, D>(deserializer: D) -> Result<Option<Option<String>>, D::Error>
where
    D: serde::Deserializer<'de>,
{
    Ok(Some(Option::deserialize(deserializer)?))
}
