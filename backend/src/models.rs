use serde::{Deserialize, Serialize};

/// Task priority level.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum Priority {
    Low,
    Medium,
    High,
}

impl Default for Priority {
    fn default() -> Self {
        Priority::Medium
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Task {
    pub id: String,
    pub title: String,
    pub description: String,
    pub completed: bool,
    #[serde(default)]
    pub priority: Priority,
    #[serde(rename = "createdAt")]
    pub created_at: String,
}

/// Accepted as a raw string on DTOs so invalid values can be rejected with a
/// 400 `AppError` (matching the title-validation pattern) instead of the
/// generic 422 Axum returns for enum deserialization failures.
#[derive(Debug, Deserialize)]
pub struct CreateTaskDto {
    pub title: Option<String>,
    pub description: Option<String>,
    pub priority: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateTaskDto {
    pub title: Option<String>,
    pub description: Option<String>,
    pub completed: Option<bool>,
    pub priority: Option<String>,
}

impl Priority {
    pub fn parse(value: &str) -> Result<Self, String> {
        match value.to_lowercase().as_str() {
            "low" => Ok(Priority::Low),
            "medium" => Ok(Priority::Medium),
            "high" => Ok(Priority::High),
            other => Err(format!(
                "Invalid priority '{other}'; expected 'low', 'medium', or 'high'"
            )),
        }
    }
}
