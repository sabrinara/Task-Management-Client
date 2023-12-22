import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';

const Managers = () => {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  const userTypes = [
    {
      id: 1,
      title: 'Developers',
      description: 'Efficiently manage project tasks and timelines.',
      image: 'https://i.ibb.co/5GyxXkZ/normal.jpg',
    },
    { 
        id: 2, 
        title: 'Corporate Professionals', 
        description: 'Stay organized with daily tasks and projects.', 
        image: 'https://i.ibb.co/MNvLxLS/premium.jpg'
    },
    { 
        id: 3, 
        title: 'Bankers', 
        description: 'Manage financial tasks and transactions.', 
        image: 'https://i.ibb.co/tKYhp8G/news1.jpg'
    },
    { 
        id: 4, 
        title: 'Managers', 
        description: 'Manage project tasks and timelines.', 
        image: 'https://i.ibb.co/8PdZxD7/ALL.jpg' 
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section className="user-types-section p-8 text-center">
      <h2 className="text-3xl md:text-6xl font-semibold mb-6" data-aos="fade-up">
        Daily life with Task Management!!
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {userTypes.map((userType, index) => (
          <motion.div
            key={userType.id}
            className="user-card bg-white border border-gray-300 p-6 rounded-lg"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.1 }}
            data-aos={index % 2 === 0 ? 'fade-left' : 'fade-right'}
          >
            <motion.img
              src={userType.image}
              alt={userType.title}
              className="w-40 h-40 mx-auto mb-4"
              whileHover={{ scale: 1.2 }}
            />
            <h3 className="text-blue-500 text-lg font-semibold mb-4">{userType.title}</h3>
            <p className="text-gray-600">{userType.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Managers;
