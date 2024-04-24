import {
  AddChapterRequestPayloadProps,
  AddProjectRequestPayloadProps,
  AddSectionRequestPayloadProps,
  DatabaseQueryResponseType,
  DeleteSectionRequestPayloadProps,
  UpateSectionRequestPayloadProps,
  UpdateProjectRequestPayloadProps,
} from '@/interfaces';
import { Project } from '@/database';

const addAProjectToDB = async ({
  name,
  slug,
  description,
  coverImageURL,
  requiredSkills,
  roadmap,
  difficultyLevel,
}: AddProjectRequestPayloadProps): Promise<DatabaseQueryResponseType> => {
  try {
    const project = new Project({
      name,
      slug,
      description,
      coverImageURL,
      requiredSkills,
      roadmap,
      difficultyLevel,
    });

    try {
      await project.save();
    } catch (error) {
      return { error };
    }

    return { data: project };
  } catch (error) {
    return { error };
  }
};

const getProjectsFromDB = async (): Promise<DatabaseQueryResponseType> => {
  try {
    const projects = await Project.find();
    return { data: projects };
  } catch (error) {
    return { error };
  }
};

const getProjectBySlugFromDB = async (
  slug: string
): Promise<DatabaseQueryResponseType> => {
  try {
    const project = await Project.findOne({ slug });

    if (!project) {
      return { error: 'Project not found' };
    }

    return { data: project };
  } catch (error) {
    return { error };
  }
};

const getProjectByIDFromDB = async (
  projectId: string
): Promise<DatabaseQueryResponseType> => {
  try {
    const project = await Project.findOne({ _id: projectId });

    if (!project) {
      return { error: 'Project not found' };
    }

    return { data: project };
  } catch (error) {
    return { error };
  }
};

const updateProjectInDB = async ({
  projectId,
  updatedData,
}: UpdateProjectRequestPayloadProps): Promise<DatabaseQueryResponseType> => {
  try {
    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectId },
      { $set: updatedData },
      { new: true }
    );

    if (!updatedProject) {
      return { error: 'Project not found' };
    }

    return { data: updatedProject };
  } catch (error) {
    return { error };
  }
};

const deleteProjectFromDB = async (
  projectId: string
): Promise<DatabaseQueryResponseType> => {
  try {
    const deletedProject = await Project.findOneAndDelete({ _id: projectId });
    if (!deletedProject) {
      return { error: 'Project not found' };
    }
    return { data: deletedProject };
  } catch (error) {
    return { error };
  }
};

const addSectionToProjectInDB = async (
  projectId: string,
  sectionData: AddSectionRequestPayloadProps
): Promise<DatabaseQueryResponseType> => {
  try {
    const project = await Project.findOne({ _id: projectId });

    if (!project) {
      return { error: 'Project not found' };
    }

    project.sections.push(sectionData);

    await project.save();

    return { data: project };
  } catch (error) {
    return { error: 'Section not added' };
  }
};

const getSectionsFromProjectInDB = async (
  projectId: string
): Promise<DatabaseQueryResponseType> => {
  try {
    const project = await Project.findOne({ _id: projectId });

    if (!project) {
      return { error: 'Project not found' };
    }

    return { data: project.sections };
  } catch (error) {
    return { error: 'Section not fetched' };
  }
};

const updateSectionInProjectInDB = async ({
  projectId,
  sectionId,
  updatedSectionName,
}: UpateSectionRequestPayloadProps): Promise<DatabaseQueryResponseType> => {
  try {
    const project = await Project.findOne({ _id: projectId });

    if (!project) {
      return { error: 'Project not found' };
    }

    const section = project.sections.find(
      (section) => section.sectionId === sectionId
    );

    if (!section) {
      return { error: 'Section not found' };
    }

    section.sectionName = updatedSectionName;

    await project.save();

    const updatedSectionIndex = project.sections.findIndex(
      (section) => section.sectionId === sectionId
    );

    return { data: project.sections[updatedSectionIndex] };
  } catch (error) {
    return { error: 'Error updating section' };
  }
};

const deleteSectionFromProjectInDB = async ({
  projectId,
  sectionId,
}: DeleteSectionRequestPayloadProps): Promise<DatabaseQueryResponseType> => {
  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return { error: 'Project not found' };
    }

    const sectionIndex = project.sections.findIndex(
      (section) => section.sectionId === sectionId
    );

    if (sectionIndex === -1) {
      return { error: 'Section not found' };
    }

    project.sections.splice(sectionIndex, 1);

    await project.save();

    return {};
  } catch (error) {
    return { error: 'Error deleting section' };
  }
};

const addChapterToSectionInDB = async (
  projectId: string,
  sectionId: string,
  chapterData: AddChapterRequestPayloadProps
): Promise<DatabaseQueryResponseType> => {
  try {
    const project = await Project.findOne({ _id: projectId });

    if (!project) {
      return { error: 'Project not found' };
    }

    const section = project.sections.find(
      (section) => section.sectionId.toString() === sectionId
    );

    if (!section) {
      return { error: 'Section not found' };
    }

    section.chapters.push(chapterData);

    await project.save();

    return { data: project };
  } catch (error) {
    return { error: 'Chapter not added' };
  }
};

export {
  addAProjectToDB,
  getProjectsFromDB,
  getProjectBySlugFromDB,
  updateProjectInDB,
  deleteProjectFromDB,
  getProjectByIDFromDB,
  addSectionToProjectInDB,
  getSectionsFromProjectInDB,
  updateSectionInProjectInDB,
  deleteSectionFromProjectInDB,
  addChapterToSectionInDB,
};
