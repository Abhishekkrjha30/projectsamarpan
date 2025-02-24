/* eslint-disable no-unreachable */
/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf.js"; // Replace with your configuration file
import authService from "./auth.js"; // Import AuthService


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
  // async getAllProjects(queries = []) {
  //   try {
  //     return await this.databases.listDocuments(
  //       conf.appwriteDatabaseId,
  //       conf.appwriteCollectionId,
  //       queries
  //     );
      
  //   } catch (error) {
  //     console.error("ProjectSubmissionService :: getAllProjects :: error", error);
  //     throw error;
  //   }
  // }

  async getAllProjects(queries = []) {
    try {
        let allDocuments = [];
        let lastDocument = null;
        const limit = 100; // Max limit per request

        while (true) {
            let queryBatch = [...queries, Query.limit(limit)];

            if (lastDocument) {
                queryBatch.push(Query.cursorAfter(lastDocument.$id));
            }


            let response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queryBatch
            );

            

            allDocuments = [...allDocuments, ...response.documents];

            if (response.documents.length < limit) {
                break;
            }

            lastDocument = response.documents[response.documents.length - 1];
        }

        return allDocuments;
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

  // Method 9: UpdateLikes 
  async updateLikes(projectId, userId) {
    try {
      // Fetch the existing document
      const project = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        projectId
      );
      // Ensure likedBy is an array (parse JSON if stored as string)
      let updatedLikes = [];
      if (project.likedBy) {
        updatedLikes = JSON.parse(project.likedBy); // Convert string to array
      }
  
      // Toggle like: Remove if exists, otherwise add
      if (updatedLikes.includes(userId)) {
        updatedLikes = updatedLikes.filter((id) => id !== userId); // Remove like
      } else {
        updatedLikes.push(userId); // Add like
      }
  
      // Convert array back to JSON string before storing
      const updatedProject = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        projectId,
        { likedBy: JSON.stringify(updatedLikes) } // Store as string
      );
  
      return updatedLikes; // Return updated likes array
    } catch (error) {
      console.error("ProjectSubmissionService :: updateLikes :: error", error);
      throw error;
    }
  }
  
  
// Method 10: Get Likes
async getLikes(projectId) {
  try {
    const project = await this.databases.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      projectId
    );

    // Ensure likedBy is properly parsed into an array
    return project.likedBy ? JSON.parse(project.likedBy) : []; 
  } catch (error) {
    console.error("ProjectSubmissionService :: getLikes :: error", error);
    return []; // Return an empty array even on error
  }
}

// Method 11: Update Views
async updateViews(projectId) {
  try {
    // Fetch the existing document
    const project = await this.databases.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      projectId
    );

    // Increment views count
    const updatedViews = (project.views || 0) + 1;

    // Update the project with the new views count
    await this.databases.updateDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      projectId,
      { views: updatedViews }
    );

    return updatedViews;
  } catch (error) {
    console.error("ProjectSubmissionService :: updateViews :: error", error);
    throw error;
  }
}


// // Method 12: Create Notification
// async createNotification({ projectId, likedByUserId, type }) {
//   try {
//     // Fetch project details
//     const project = await this.getProjectById(projectId);

//     // Fetch user details using AuthService
//     const likedByUser = await authService.getUserById(likedByUserId);
//     const likedByUserName = likedByUser?.name || "Someone";

//     const notificationData = {
//       title: "Project Liked ",
//       message: ` Your project "${project.title}" was liked by ${likedByUserName}`,
//       userId: project.userId,
//       type,
//       timestamp: new Date().toISOString(),
//       seen: false,
//       projectId:projectId,
//     };

//     return await this.databases.createDocument(
//       conf.appwriteDatabaseId,
//       conf.appwriteNotificationsCollectionId,
//       ID.unique(),
//       notificationData
//     );
//   } catch (error) {
//     console.error("Error in createNotification:", error);
//     throw error;
//   }
// }

// // Method 13: Get All Notifications by User ID
// async getAllNotificationsByUserId(userId) {
//   try {
//     return await this.databases.listDocuments(
//       conf.appwriteDatabaseId,
//       conf.appwriteNotificationsCollectionId,
//       [Query.equal("userId", userId)] // ✅ Filter by userId
//     );
//   } catch (error) {
//     console.error("Error fetching notifications for user:", error);
//     throw error;
//   }
// }


// // Method 14: Mark Notification As Seen
// async markNotificationAsSeen(notificationId) {
//   try {
//     return await this.databases.updateDocument(
//       conf.appwriteDatabaseId,
//       conf.appwriteNotificationsCollectionId, // ✅ Updated collection ID reference
//       notificationId,
//       { seen: true }
//     );
//   } catch (error) {
//     console.error("Error marking notification as seen:", error);
//     throw error;
//   }
// }


// // Method 16: Get Unseen  Notification 
// async getUnseenNotifications(userId) {
//   try {
//     if (!userId) throw new Error("User ID is missing");

//     const response = await this.databases.listDocuments(
//       conf.appwriteDatabaseId,
//       conf.appwriteNotificationsCollectionId,
//       [Query.equal("userId", userId), Query.equal("seen", false)]
//     );

    
//     return response;
//   } catch (error) {
//     console.error("Error fetching unseen notifications:", error);
//     throw error;
//   }
// }



// // Method 17: Get Current  Notification 
// async getCurrentNotifications(userId, limit = 10) {
//   try {
//     return await this.databases.listDocuments(
//       conf.appwriteDatabaseId,
//       conf.appwriteNotificationsCollectionId, // ✅ Updated collection ID reference
//       [
//         Query.equal("userId", userId),
//         Query.orderDesc("timestamp"),
//         Query.limit(limit),
//       ]
//     );
//   } catch (error) {
//     console.error("Error fetching current notifications:", error);
//     throw error;
//   }
// }

}

// Singleton Export
const projectSubmissionService = new ProjectSubmissionService();
export default projectSubmissionService;
