package com.zenitrade.entity;
import jakarta.persistence.*; import java.math.BigDecimal; import java.time.Instant;
@Entity @Table(name="wallet_transactions") public class WalletTransaction { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id; @ManyToOne public User user; @Column(name="transaction_type") public String transactionType; public String method; public BigDecimal amount; public String status="COMPLETED"; @Column(name="reference_note") public String referenceNote; @Column(name="created_at") public Instant createdAt=Instant.now(); }
