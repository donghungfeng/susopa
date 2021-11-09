package dnhung.susopa.entity;

import javax.persistence.*;

@Entity
@Table(name = "orderrr", schema = "main", catalog = "")
public class OrderEntity {
    private Long id;
    private String code;
    private double amount;
    private double received;
    private Integer status;
    private double time;
    private double expirationTime;
    private double discountCustomer;
    private double discountVoucher;
    private double discountVoucherM;
    private String customerPhone;
    private String customerName;
    private String customerAddress;
    private Long countProduct;
    private Long countService;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "code")
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Basic
    @Column(name = "count_product")
    public Long getCountProduct() {
        return countProduct;
    }

    public void setCountProduct(Long countProduct) {
        this.countProduct = countProduct;
    }

    @Basic
    @Column(name = "count_service")
    public Long getCountService() {
        return countService;
    }

    public void setCountService(Long countService) {
        this.countService = countService;
    }

    @Basic
    @Column(name = "amount")
    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    @Basic
    @Column(name = "received")
    public double getReceived() {
        return received;
    }

    public void setReceived(double received) {
        this.received = received;
    }

    @Basic
    @Column(name = "status")
    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @Basic
    @Column(name = "time")
    public double getTime() {
        return time;
    }

    public void setTime(double time) {
        this.time = time;
    }

    @Basic
    @Column(name = "expiration_time")
    public double getExpirationTime() {
        return expirationTime;
    }

    public void setExpirationTime(double expirationTime) {
        this.expirationTime = expirationTime;
    }

    @Basic
    @Column(name = "customer_phone")
    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    @Basic
    @Column(name = "customer_name")
    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    @Basic
    @Column(name = "customer_address")
    public String getCustomerAddress() {
        return customerAddress;
    }

    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }

    @Basic
    @Column(name = "discount_voucher")
    public double getDiscountVoucher() {
        return discountVoucher;
    }

    public void setDiscountVoucher(double discountVoucher) {
        this.discountVoucher = discountVoucher;
    }

    @Basic
    @Column(name = "discount_customer")
    public double getDiscountCustomer() {
        return discountCustomer;
    }

    public void setDiscountCustomer(double discountCustomer) {
        this.discountCustomer = discountCustomer;
    }

    @Basic
    @Column(name = "discount_voucher_m")
    public double getDiscountVoucherM() {
        return discountVoucherM;
    }

    public void setDiscountVoucherM(double discountVoucherM) {
        this.discountVoucherM = discountVoucherM;
    }

}
