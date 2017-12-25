package cn.simpletool.watermarker.aspect;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;

/**
 * 日志记录切面
 *
 * @author ZhanJingbo
 * @version 1.0.0
 * Created on 2017/8/6
 */
@Slf4j
@Aspect
public class LogAspect {

    @Pointcut("execution(* cn.simpletool.*.*(..))")
    private void logPointCut() {
    }

    @Before("logPointCut()")
    public void logBefore(JoinPoint joinPoint) {
        String className = joinPoint.getSignature().getDeclaringTypeName();
        String method = joinPoint.getSignature().getName();
        String param = joinPoint.getArgs().toString();
        log.info("into className:{},Method:{},param:{}", className, method, param);
    }

    @AfterThrowing(pointcut = "logPointCut()", throwing = "exception")
    public void logException(Throwable exception, JoinPoint joinPoint) {
        String className = joinPoint.getSignature().getDeclaringTypeName();
        String method = joinPoint.getSignature().getName();
        String param = joinPoint.getArgs().toString();
        log.error("error className:{},Method:{},exception:{}", className, method, exception.toString());
    }
}
