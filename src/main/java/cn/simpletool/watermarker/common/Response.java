package cn.simpletool.watermarker.common;

import lombok.Data;

/**
 * @author ZhanJingbo
 * @version 1.0.0
 * Created on 2017/10/31
 */
@Data
public class Response<T> {

    /**
     * 是否成功
     */
    private boolean success;

    /**
     * 返回的数据
     */
    private T data;

    public Response() {}

    public Response(boolean success, T data) {
        this.success = success;
        this.data = data;
    }

    public static Response result(Object data) {
        return new Response(Boolean.TRUE, data);
    }

}
