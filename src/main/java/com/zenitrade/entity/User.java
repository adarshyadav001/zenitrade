package com.zenitrade.entity;
import jakarta.persistence.*; import java.math.BigDecimal; import java.time.Instant;
@Entity @Table(name="users") public class User { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id; public String name; @Column(unique=true) public String email; @Column(name="password_hash") public String passwordHash; @Column(name="virtual_cash") public BigDecimal virtualCash=BigDecimal.valueOf(100000); @Column(name="created_at") public Instant createdAt=Instant.now(); }
