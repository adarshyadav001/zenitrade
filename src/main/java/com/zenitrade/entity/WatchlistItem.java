package com.zenitrade.entity;
import jakarta.persistence.*;
@Entity @Table(name="watchlist_items") public class WatchlistItem { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id; @ManyToOne public User user; @ManyToOne public Stock stock; }
