// import { useEffect, useState } from "react";
// import projectSubmissionService from "../../appwrite/config";
// import authService from "../../appwrite/auth"; // Ensure you have authService.getCurrentUser()

// const NotificationsPage = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const user = await authService.getCurrentUser();
//         if (user) {
          
//           setUserId(user.$id);
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };

//     fetchUser();
//   }, []);

//   useEffect(() => {
//     if (!userId) return; // Prevent fetching with null userId

//     const fetchNotifications = async () => {
//       try {
//         const response = await projectSubmissionService.getAllNotificationsByUserId(userId);
//         const fetchedNotifications = response.documents || [];
        
//         setNotifications(fetchedNotifications);

//         // Mark all notifications as seen
//         await Promise.all(
//           fetchedNotifications.map((notification) => {
//             if (!notification.seen) {
//               return projectSubmissionService.markNotificationAsSeen(notification.$id);
//             }
//             return Promise.resolve();
//           })
//         );
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, [userId]); // Runs when userId is set


//   return (
//     <div className="max-w-2xl mx-auto p-6 rounded-xl max-h-screen my-10 shadow-xl overflow-auto">
//       <h1 className="text-2xl font-bold mb-4">Notifications</h1>

//       {loading ? (
//         <p className="min-h-screen">Loading notifications...</p>
//       ) : notifications.length === 0 ? (
//         <p className="min-h-screen">No notifications yet.</p>
//       ) : (
//         <div className="space-y-4">
//           {notifications.map((notification) => (
//             <div key={notification.$id} className="p-4 border border-gray-50 hover:scale-102 transition-all rounded-lg shadow-md bg-white">
//               <p className="text-lg font-semibold inline-block">{notification.title}<pre className="inline-block"> : </pre></p>
//               <p className="text-sm text-gray-700 inline-block">{notification.message}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NotificationsPage;
