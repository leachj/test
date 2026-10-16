from __future__ import annotations

from fastapi.testclient import TestClient


def test_health_returns_ok_status(client: TestClient) -> None:
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json() == {"status": "ok"}


def test_get_tasks_returns_empty_array_when_no_tasks_exist(client: TestClient) -> None:
    res = client.get("/api/tasks")
    assert res.status_code == 200
    assert res.json() == []


def test_get_tasks_returns_all_tasks(client: TestClient) -> None:
    client.post("/api/tasks", json={"title": "Task 1"})
    client.post("/api/tasks", json={"title": "Task 2"})

    res = client.get("/api/tasks")
    assert res.status_code == 200
    assert len(res.json()) == 2


def test_post_tasks_creates_a_task_with_title(client: TestClient) -> None:
    res = client.post(
        "/api/tasks", json={"title": "My Task", "description": "Some description"}
    )

    assert res.status_code == 201
    body = res.json()
    assert body["title"] == "My Task"
    assert body["description"] == "Some description"
    assert body["completed"] is False
    assert isinstance(body["id"], str)
    assert isinstance(body["createdAt"], str)


def test_post_tasks_returns_400_when_title_is_missing(client: TestClient) -> None:
    res = client.post("/api/tasks", json={"description": "no title"})
    assert res.status_code == 400


def test_post_tasks_returns_400_when_title_is_empty(client: TestClient) -> None:
    res = client.post("/api/tasks", json={"title": "   "})
    assert res.status_code == 400


def test_get_task_by_id_returns_task(client: TestClient) -> None:
    create = client.post("/api/tasks", json={"title": "Find me"})
    task_id = create.json()["id"]

    res = client.get(f"/api/tasks/{task_id}")
    assert res.status_code == 200
    assert res.json()["title"] == "Find me"


def test_get_task_by_id_returns_404_for_unknown_id(client: TestClient) -> None:
    res = client.get("/api/tasks/nonexistent")
    assert res.status_code == 404


def test_patch_task_updates_fields(client: TestClient) -> None:
    create = client.post("/api/tasks", json={"title": "Original"})
    task_id = create.json()["id"]

    res = client.patch(f"/api/tasks/{task_id}", json={"title": "Updated", "completed": True})
    assert res.status_code == 200
    body = res.json()
    assert body["title"] == "Updated"
    assert body["completed"] is True


def test_patch_task_returns_404_for_unknown_id(client: TestClient) -> None:
    res = client.patch("/api/tasks/nonexistent", json={"title": "x"})
    assert res.status_code == 404


def test_delete_task_deletes_a_task(client: TestClient) -> None:
    create = client.post("/api/tasks", json={"title": "Delete me"})
    task_id = create.json()["id"]

    delete_res = client.delete(f"/api/tasks/{task_id}")
    assert delete_res.status_code == 204

    get_res = client.get(f"/api/tasks/{task_id}")
    assert get_res.status_code == 404


def test_delete_task_returns_404_for_unknown_id(client: TestClient) -> None:
    res = client.delete("/api/tasks/nonexistent")
    assert res.status_code == 404
