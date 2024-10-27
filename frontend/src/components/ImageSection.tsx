import React from 'react';
import { Box, Image, Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const ImageSection: React.FC = () => {
    return (
        <motion.div
            style={{ textAlign: "center", marginBottom: "2.5rem", paddingTop: "0.25rem" }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <motion.h2
                style={{
                    fontSize: "2rem",
                    marginBottom: "3.5rem",
                    color: "gray.700",
                    background: "transparent",
                }}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Stay Productive
            </motion.h2>
            <Box display="flex" justifyContent="center" alignItems="center" bg="transparent">
                <motion.img
                    src={`${process.env.PUBLIC_URL}/bannerForNow.png`}
                    alt="Description of the image"
                    style={{ maxWidth: "100%", height: "auto", marginBottom: "1rem", background: "transparent" }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                />
            </Box>
        </motion.div>
    );
}

export default ImageSection;
