package com.devops.javabackend.controller;

import com.devops.javabackend.model.SiteSetting;
import com.devops.javabackend.repository.SiteSettingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/settings")
public class SettingController {

    @Autowired
    private SiteSettingRepository siteSettingRepository;

    @GetMapping("/{key}")
    public ResponseEntity<?> getSetting(@PathVariable String key) {
        Optional<SiteSetting> setting = siteSettingRepository.findBySettingKey(key);
        if (setting.isPresent()) {
            return ResponseEntity.ok(Map.of(
                    "key", setting.get().getSettingKey(),
                    "value", setting.get().getSettingValue() != null ? setting.get().getSettingValue() : ""
            ));
        } else {
            return ResponseEntity.ok(Map.of(
                    "key", key,
                    "value", ""
            ));
        }
    }

    @PutMapping("/{key}")
    public ResponseEntity<?> updateSetting(@PathVariable String key, @RequestBody Map<String, String> request) {
        String value = request.get("value");
        SiteSetting setting = siteSettingRepository.findBySettingKey(key).orElse(new SiteSetting());
        setting.setSettingKey(key);
        setting.setSettingValue(value);
        siteSettingRepository.save(setting);
        
        return ResponseEntity.ok(Map.of(
                "message", "Setting updated successfully",
                "key", key,
                "value", value
        ));
    }
}
