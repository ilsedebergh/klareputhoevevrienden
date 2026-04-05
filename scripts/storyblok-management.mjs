const MANAGEMENT_BASE_URL = "https://mapi.storyblok.com/v1";

function requiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export function getManagementConfig() {
  return {
    token: requiredEnv("STORYBLOK_MANAGEMENT_TOKEN"),
    spaceId: requiredEnv("STORYBLOK_SPACE_ID")
  };
}

export async function storyblokRequest(path, { method = "GET", body } = {}) {
  const { token } = getManagementConfig();
  const response = await fetch(`${MANAGEMENT_BASE_URL}${path}`, {
    method,
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${method} ${path} failed: ${response.status} ${text}`);
  }

  return response.status === 204 ? null : response.json();
}

export async function listComponents() {
  const { spaceId } = getManagementConfig();
  const response = await storyblokRequest(`/spaces/${spaceId}/components`);
  return response.components || [];
}

export async function createComponent(component) {
  const { spaceId } = getManagementConfig();
  const response = await storyblokRequest(`/spaces/${spaceId}/components`, {
    method: "POST",
    body: {
      component
    }
  });
  return response.component;
}

export async function listStories() {
  const { spaceId } = getManagementConfig();
  let page = 1;
  let keepGoing = true;
  const stories = [];

  while (keepGoing) {
    const response = await storyblokRequest(`/spaces/${spaceId}/stories?page=${page}&per_page=100`);
    const batch = response.stories || [];
    stories.push(...batch);
    keepGoing = batch.length === 100;
    page += 1;
  }

  return stories;
}

export async function createStory(story, publish = true) {
  const { spaceId } = getManagementConfig();
  const response = await storyblokRequest(`/spaces/${spaceId}/stories`, {
    method: "POST",
    body: {
      story,
      publish: publish ? 1 : 0
    }
  });
  return response.story;
}
