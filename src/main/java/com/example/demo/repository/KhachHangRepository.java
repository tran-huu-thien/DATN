package com.example.demo.repository;


import com.example.demo.entity.KhachHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KhachHangRepository extends JpaRepository<KhachHang, Integer> {
    KhachHang findKhachHangBySoDienThoai(String sdt);

    @Query("SELECT k FROM KhachHang k WHERE k.soDienThoai IS NOT NULL")
    List<KhachHang> getKhachHang();
}
