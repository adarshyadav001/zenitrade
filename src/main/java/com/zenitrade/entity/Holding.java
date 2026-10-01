package com.zenitrade.entity;
import jakarta.persistence.*; import java.math.BigDecimal;
@Entity @Table(name="holdings") public class Holding { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id; @ManyToOne public User user; @ManyToOne public Stock stock; @Column(name="product_type") public String productType="DELIVERY"; public int quantity; @Column(name="average_buy_price") public BigDecimal averageBuyPrice; }
