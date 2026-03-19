public enum Status {
    PENDENTE(1),
    PROCESSANDO(2),
    PAGO(3);

    private final int orderCode;

    Status(int orderCode) {
        this.orderCode = orderCode;
    }

    public int getOrderCode() { return orderCode; }
}