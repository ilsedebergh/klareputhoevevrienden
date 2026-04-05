import { COMPONENTS, FOLDERS, STARTER_STORIES } from "./storyblok-space.mjs";
import { createComponent, createStory, listComponents, listStories } from "./storyblok-management.mjs";

function storyWithGeneratedIds(input) {
  if (Array.isArray(input)) {
    return input.map(storyWithGeneratedIds);
  }

  if (input && typeof input === "object") {
    const withChildren = Object.fromEntries(
      Object.entries(input).map(([key, value]) => [key, storyWithGeneratedIds(value)])
    );

    if (typeof input.component === "string" && !input._uid) {
      return {
        _uid: crypto.randomUUID(),
        ...withChildren
      };
    }

    return withChildren;
  }

  return input;
}

async function ensureComponents() {
  const existing = await listComponents();
  const names = new Set(existing.map((component) => component.name));

  for (const component of COMPONENTS) {
    if (names.has(component.name)) {
      console.log(`skip component ${component.name}`);
      continue;
    }

    await createComponent(component);
    console.log(`created component ${component.name}`);
  }
}

async function ensureFolders(existingStories) {
  const foldersBySlug = new Map(
    existingStories.filter((story) => story.is_folder).map((story) => [story.slug, story])
  );

  for (const folder of FOLDERS) {
    if (foldersBySlug.has(folder.slug)) {
      console.log(`skip folder ${folder.slug}`);
      continue;
    }

    const created = await createStory(
      {
        name: folder.name,
        slug: folder.slug,
        is_folder: true
      },
      true
    );

    foldersBySlug.set(folder.slug, created);
    existingStories.push(created);
    console.log(`created folder ${folder.slug}`);
  }

  return foldersBySlug;
}

async function ensureStarterStories(existingStories, foldersBySlug) {
  const fullSlugs = new Set(existingStories.filter((story) => !story.is_folder).map((story) => story.full_slug));

  for (const definition of STARTER_STORIES) {
    const expectedFullSlug = definition.parent_folder_slug
      ? `${definition.parent_folder_slug}/${definition.slug}`
      : definition.slug;

    if (fullSlugs.has(expectedFullSlug)) {
      console.log(`skip story ${expectedFullSlug}`);
      continue;
    }

    const parentFolder = definition.parent_folder_slug
      ? foldersBySlug.get(definition.parent_folder_slug)
      : undefined;

    const story = {
      name: definition.name,
      slug: definition.slug,
      parent_id: parentFolder?.id,
      content: storyWithGeneratedIds(definition.content)
    };

    const created = await createStory(story, true);
    existingStories.push(created);
    fullSlugs.add(expectedFullSlug);
    console.log(`created story ${expectedFullSlug}`);
  }
}

async function main() {
  await ensureComponents();
  const stories = await listStories();
  const foldersBySlug = await ensureFolders(stories);
  await ensureStarterStories(stories, foldersBySlug);
  console.log("Storyblok bootstrap finished.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
