package com.devops.javabackend.config;

import com.devops.javabackend.model.User;
import com.devops.javabackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class AdminSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        String adminEmail = "admin@devops.com";

        // Kiểm tra xem admin đã tồn tại trong DB chưa
        if (userRepository.findByEmail(adminEmail).isEmpty()) {
            System.out.println("🔧 Đang tạo tài khoản Admin mặc định...");

            User admin = new User();
            admin.setName("System Admin");
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode("admin123")); // Mật khẩu mặc định
            admin.setRole("ADMIN"); // Quyền Admin
            admin.setJoinDate(LocalDate.now());
            admin.setAvatar("/default-avatar.png");
            admin.setCoursesCompleted(0);
            admin.setArticlesRead(0);
            admin.setProjectsFinished(0);
            admin.setLearningStreak(0);

            userRepository.save(admin);
            System.out.println("✅ Đã tạo tài khoản Admin! Email: " + adminEmail + " | Mật khẩu: admin123");
        } else {
            System.out.println("✅ Tài khoản Admin đã có sẵn. Bỏ qua bước tạo.");
        }
    }
}
