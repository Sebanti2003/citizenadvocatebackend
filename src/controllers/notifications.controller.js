import Complaint from "../models/complaint.model.js";
import Notification from "../models/notifications.model.js";

export const givenotification = async (req, res) => {
  try {
    const io = req.app.get("socketio");
    const userSockets = req.app.get("userSockets"); 

    const ministry = req.ministry._id;
    const content = req.body.content;
    const { id } = req.params;

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    const userid = complaint.person;


    const newnotification = await Notification.create({
      person: userid,
      ministry,
      content,
    });


    const userSocketId = userSockets.get(userid.toString());
    if (userSocketId) {
      io.to(userSocketId).emit("newNotification", {
        message: "You have a new notification",
        notification: newnotification,
      });
      console.log(`Notification sent to user ${userid}`);
    }

    res.status(200).json({
      message: "Notification sent successfully",
      success: true,
      newnotification,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
