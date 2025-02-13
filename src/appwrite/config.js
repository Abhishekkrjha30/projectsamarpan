/* eslint-disable no-unreachable */
/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf.js"; // Replace with your configuration file

export class ProjectSubmissionService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // Method 1: Submit Project
async submitProject({ title, description, price, image, video, projectLink, userId, batch ,devName}) {
  try {
    const projectData = {
      title,
      description,
      price,
      userId,
      projectLink, // Add project link directly to project data
      batch,
      devName
    };

    // Check if image exists and upload
    if (image) {
      const uploadedImage = await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        image
      );
      projectData.image = uploadedImage.$id; // Store file reference
    }

    // Check if video exists and upload
    if (video) {
      const uploadedVideo = await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        video
      );
      projectData.video = uploadedVideo.$id; // Store file reference
    }

    return await this.databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      ID.unique(),
      projectData
    );
  } catch (error) {
    console.error("ProjectSubmissionService :: submitProject :: error", error);
    throw error;
  }
}


  // Method 2: Get Single Project by ID
  async getProjectById(projectId) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        projectId
      );
    } catch (error) {
      console.error("ProjectSubmissionService :: getProjectById :: error", error);
      throw error;
    }
  }

  // Method 3: Get All Projects
  async getAllProjects(queries = []) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("ProjectSubmissionService :: getAllProjects :: error", error);
      throw error;
    }
  }
  

  // Method 4: Update Project
async updateProject(projectId, { title, description, price, image, video, projectLink, userId,batch,devName }) { 
  try {
    const projectData = { 
      title: title || '',
      description: description || '',
      price: price || 0,
      userId: userId || '',
      batch: batch || '',
      devName: devName || '',
    };

    if (image) {
      const uploadedImage = await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        image
      );
      projectData.image = uploadedImage.$id;
    }

    if (video) {
      const uploadedVideo = await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        video
      );
      projectData.video = uploadedVideo.$id;
    }

    // Replace 'code' with 'projectLink' and add to project data
    if (projectLink) {
      projectData.projectLink = projectLink;
    }

    return await this.databases.updateDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      projectId,
      projectData
    );
  } catch (error) {
    console.error("ProjectSubmissionService :: updateProject :: error", error);
    throw error;
  }
}

  // Method 5: Delete Project
  async deleteProject(projectId) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        projectId
      );
      return true;
    } catch (error) {
      console.error("ProjectSubmissionService :: deleteProject :: error", error);
      return false;
    }
  }

  // Method 6: Upload File
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("ProjectSubmissionService :: uploadFile :: error", error);
      throw error;
    }
  }

  // Method 7: Delete File
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId
      );
      return true;
    } catch (error) {
      console.error("ProjectSubmissionService :: deleteFile :: error", error);
      return false;
    }
  }

  // Method 8: Get File Preview
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(
      conf.appwriteBucketId,
      fileId
    );
  }
}

// Singleton Export
const projectSubmissionService = new ProjectSubmissionService();
export default projectSubmissionService;
